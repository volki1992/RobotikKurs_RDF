#!/usr/bin/env python3
"""Statische Qualitätsprüfung für veröffentlichte Robotikmodule."""

from __future__ import annotations

import argparse
from html.parser import HTMLParser
from pathlib import Path
import re
import shutil
import subprocess
import sys
from urllib.parse import unquote, urlsplit


if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")


PROJECT_ROOT = Path(__file__).resolve().parents[4]
SITE_ROOT = PROJECT_ROOT / "site"
ACTIVE_EXTERNAL_TAGS = {"audio", "img", "link", "script", "source", "video"}
LOCAL_LINK_TAGS = {"a", "audio", "iframe", "img", "link", "script", "source", "video"}
PLACEHOLDER = re.compile(
    r"\b(?:TODO|FIXME)\b|\[(?:Titel|Untertitel|Thema|Lernziel|Text|Quelle)\]",
    re.IGNORECASE,
)
BALANCED_TAGS = {"article", "details", "div", "figure", "main", "ol", "section", "table", "ul"}


class ModuleParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.ids: dict[str, int] = {}
        self.duplicate_ids: list[tuple[str, int]] = []
        self.fragments: list[tuple[str, int]] = []
        self.references: list[tuple[str, str, str, int, dict[str, str]]] = []
        self.image_issues: list[tuple[str, int]] = []
        self.iframe_issues: list[tuple[str, int]] = []
        self.svg_issues: list[tuple[str, int]] = []
        self.external_link_warnings: list[tuple[str, int]] = []
        self.has_html = False
        self.has_lang = False
        self.has_charset = False
        self.has_viewport = False
        self.has_main = False
        self.h1_count = 0
        self.has_sources = False
        self.in_title = False
        self.title_text: list[str] = []
        self.start_counts = {tag: 0 for tag in BALANCED_TAGS}
        self.end_counts = {tag: 0 for tag in BALANCED_TAGS}

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        tag = tag.lower()
        line = self.getpos()[0]
        values = {key.lower(): value or "" for key, value in attrs}
        if tag in BALANCED_TAGS:
            self.start_counts[tag] += 1

        element_id = values.get("id")
        if element_id:
            if element_id in self.ids:
                self.duplicate_ids.append((element_id, line))
            else:
                self.ids[element_id] = line

        if tag == "html":
            self.has_html = True
            self.has_lang = bool(values.get("lang", "").strip())
        elif tag == "meta":
            self.has_charset = self.has_charset or bool(values.get("charset", "").strip())
            self.has_viewport = self.has_viewport or values.get("name", "").lower() == "viewport"
        elif tag == "title":
            self.in_title = True
        elif tag == "main":
            self.has_main = True
        elif tag == "h1":
            self.h1_count += 1

        classes = set(values.get("class", "").split())
        if "module-sources" in classes:
            self.has_sources = True

        if tag == "img":
            if "alt" not in values:
                self.image_issues.append(("Alternativtext fehlt", line))
            elif not values["alt"].strip():
                self.image_issues.append(("Alternativtext ist leer", line))
        elif tag == "iframe":
            if not values.get("title", "").strip():
                self.iframe_issues.append(("Titel fehlt", line))
            if values.get("loading", "").lower() != "lazy":
                self.iframe_issues.append(("loading=\"lazy\" fehlt", line))
        elif tag == "svg" and values.get("role", "").lower() == "img":
            if not values.get("aria-label", "").strip() and not values.get("aria-labelledby", "").strip():
                self.svg_issues.append(("Beschriftung für SVG mit role=\"img\" fehlt", line))

        href = values.get("href", "")
        if href.startswith("#") and len(href) > 1:
            self.fragments.append((unquote(href[1:]), line))

        if tag == "a" and values.get("target", "").lower() == "_blank":
            rel = set(values.get("rel", "").lower().split())
            if "noopener" not in rel:
                self.external_link_warnings.append(("Link mit target=\"_blank\" ohne rel=\"noopener\"", line))

        if tag in LOCAL_LINK_TAGS:
            attributes = ["src"]
            if tag in {"a", "link"}:
                attributes = ["href"]
            elif tag == "video":
                attributes = ["src", "poster"]
            for attribute in attributes:
                value = values.get(attribute, "").strip()
                if value:
                    self.references.append((tag, attribute, value, line, values))

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag in BALANCED_TAGS:
            self.end_counts[tag] += 1
        if tag == "title":
            self.in_title = False

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title_text.append(data)


def is_external(value: str) -> bool:
    parsed = urlsplit(value)
    return parsed.scheme.lower() in {"http", "https"} or value.startswith("//")


def local_target(page: Path, value: str) -> Path | None:
    parsed = urlsplit(value)
    if parsed.scheme or value.startswith("//"):
        return None
    path_text = unquote(parsed.path)
    if not path_text:
        return None
    if path_text.startswith("/"):
        return (SITE_ROOT / path_text.lstrip("/")).resolve()
    return (page.parent / path_text).resolve()


def relative(path: Path) -> str:
    try:
        return path.resolve().relative_to(PROJECT_ROOT.resolve()).as_posix()
    except ValueError:
        return str(path)


def check_javascript(paths: set[Path], skip: bool) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []
    if skip or not paths:
        return errors, warnings

    node = shutil.which("node")
    if not node:
        warnings.append("Node.js wurde nicht gefunden; JavaScript-Syntax wurde nicht geprüft")
        return errors, warnings

    for path in sorted(paths):
        result = subprocess.run(
            [node, "--check", str(path)],
            capture_output=True,
            text=True,
            check=False,
        )
        if result.returncode:
            detail = (result.stderr or result.stdout).strip().splitlines()
            message = detail[-1] if detail else "unbekannter Syntaxfehler"
            errors.append(f"{relative(path)}: JavaScript-Syntaxfehler: {message}")
    return errors, warnings


def check_page(page: Path, skip_js: bool) -> tuple[list[str], list[str]]:
    errors: list[str] = []
    warnings: list[str] = []

    try:
        text = page.read_text(encoding="utf-8")
    except (OSError, UnicodeError) as exc:
        return [f"Datei kann nicht als UTF-8 gelesen werden: {exc}"], warnings

    if not re.match(r"^\s*<!doctype\s+html\s*>", text, re.IGNORECASE):
        errors.append("Datei beginnt nicht mit <!doctype html>")
    if not re.search(r"</html>\s*$", text, re.IGNORECASE):
        errors.append("Datei endet nicht mit </html>")

    placeholder = PLACEHOLDER.search(text)
    if placeholder:
        line = text.count("\n", 0, placeholder.start()) + 1
        errors.append(f"Zeile {line}: Platzhalter oder Arbeitsnotiz gefunden: {placeholder.group(0)}")

    if re.search(r"(?:^|[/\\])referenzen(?:[/\\])", text, re.IGNORECASE):
        errors.append("Die veröffentlichte Seite verweist auf den lokalen Ordner referenzen/")

    parser = ModuleParser()
    parser.feed(text)
    parser.close()

    if not parser.has_html:
        errors.append("<html>-Element fehlt")
    elif not parser.has_lang:
        errors.append("Sprachattribut lang am <html>-Element fehlt")
    if not parser.has_charset:
        errors.append("Zeichencodierung <meta charset=...> fehlt")
    if not parser.has_viewport:
        errors.append("Viewport-Angabe für schmale Ansichten fehlt")
    if not "".join(parser.title_text).strip():
        errors.append("Seitentitel ist leer oder fehlt")
    if not parser.has_main:
        errors.append("<main>-Bereich fehlt")
    if parser.h1_count != 1:
        errors.append(f"Genau eine Hauptüberschrift <h1> erwartet, gefunden: {parser.h1_count}")
    if page.name.lower().startswith("modul-") and not parser.has_sources:
        errors.append("Quellenbereich mit class=\"module-sources\" fehlt")

    for tag in sorted(BALANCED_TAGS):
        opened = parser.start_counts[tag]
        closed = parser.end_counts[tag]
        if opened != closed:
            errors.append(f"Tag <{tag}> ist nicht ausgeglichen: {opened} geöffnet, {closed} geschlossen")

    for element_id, line in parser.duplicate_ids:
        errors.append(f"Zeile {line}: ID \"{element_id}\" ist doppelt vergeben")
    for fragment, line in parser.fragments:
        if fragment not in parser.ids:
            errors.append(f"Zeile {line}: Sprungziel #{fragment} existiert nicht")
    for message, line in parser.image_issues:
        errors.append(f"Zeile {line}: Bild – {message}")
    for message, line in parser.iframe_issues:
        errors.append(f"Zeile {line}: Eingebettetes Medium – {message}")
    for message, line in parser.svg_issues:
        errors.append(f"Zeile {line}: {message}")
    for message, line in parser.external_link_warnings:
        warnings.append(f"Zeile {line}: {message}")

    javascript_paths: set[Path] = set()
    robotik_css_found = False
    site_root = SITE_ROOT.resolve()

    for tag, attribute, value, line, attributes in parser.references:
        if "referenzen" in value.replace("\\", "/").lower().split("/"):
            errors.append(f"Zeile {line}: Verweis auf referenzen/ ist nicht veröffentlichbar")
            continue

        if is_external(value):
            parsed = urlsplit(value if not value.startswith("//") else "https:" + value)
            host = (parsed.hostname or "").lower()
            if tag == "iframe":
                if host != "www.youtube-nocookie.com":
                    errors.append(f"Zeile {line}: Externes iframe ist nicht über youtube-nocookie.com eingebunden")
            elif tag in ACTIVE_EXTERNAL_TAGS:
                errors.append(f"Zeile {line}: Externe Ressource in <{tag}> ist nicht zulässig: {value}")
            continue

        target = local_target(page, value)
        if target is None:
            continue
        try:
            target.relative_to(site_root)
        except ValueError:
            errors.append(f"Zeile {line}: Lokales Ziel liegt außerhalb von site/: {value}")
            continue
        if not target.exists():
            errors.append(f"Zeile {line}: Lokales Ziel fehlt: {value}")
            continue
        if tag == "script" and target.suffix.lower() == ".js":
            javascript_paths.add(target)
        if tag == "link" and "stylesheet" in attributes.get("rel", "").lower().split():
            robotik_css_found = robotik_css_found or target.name.lower() == "robotik.css"

    if not robotik_css_found:
        errors.append("Das gemeinsame Stylesheet robotik.css ist nicht eingebunden")

    js_errors, js_warnings = check_javascript(javascript_paths, skip_js)
    errors.extend(js_errors)
    warnings.extend(js_warnings)
    return errors, warnings


def discover_pages(arguments: list[str]) -> list[Path]:
    if not arguments:
        return sorted(SITE_ROOT.rglob("modul-*.html"))

    pages: set[Path] = set()
    for argument in arguments:
        candidate = Path(argument)
        if not candidate.is_absolute():
            candidate = PROJECT_ROOT / candidate
        candidate = candidate.resolve()
        if candidate.is_dir():
            pages.update(candidate.rglob("modul-*.html"))
        elif candidate.is_file():
            pages.add(candidate)
        else:
            print(f"FEHLER: Pfad nicht gefunden: {argument}", file=sys.stderr)
    return sorted(pages)


def main(argv: list[str] | None = None) -> int:
    argument_parser = argparse.ArgumentParser(
        description="Prüft Robotikmodule vor der Veröffentlichung auf strukturelle Fehler."
    )
    argument_parser.add_argument(
        "paths",
        nargs="*",
        help="HTML-Dateien oder Ordner; ohne Angabe werden alle site/modul-*.html geprüft",
    )
    argument_parser.add_argument(
        "--skip-js",
        action="store_true",
        help="JavaScript-Syntaxprüfung überspringen",
    )
    args = argument_parser.parse_args(argv)

    pages = discover_pages(args.paths)
    if not pages:
        print("FEHLER: Keine Modulseiten gefunden", file=sys.stderr)
        return 2

    error_count = 0
    for page in pages:
        print(f"Prüfe {relative(page)}")
        errors, warnings = check_page(page, args.skip_js)
        for warning in warnings:
            print(f"  WARNUNG: {warning}")
        for error in errors:
            print(f"  FEHLER: {error}")
        if errors:
            error_count += len(errors)
        else:
            print("  OK")

    if error_count:
        print(f"\nPrüfung fehlgeschlagen: {error_count} Fehler")
        return 1
    print(f"\nPrüfung bestanden: {len(pages)} Modulseite(n)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
