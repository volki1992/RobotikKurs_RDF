# Robotikkurs – Projektregeln

## Projektüberblick

- Dieses Repository enthält statische HTML-Lerneinheiten für den Robotikkurs der Rudolf-Diesel-Fachschule Nürnberg.
- Veröffentlichte Seiten liegen ausschließlich unter `site/`. `site/index.html` ist die freigegebene Startseite.
- `Kursbriefing.md` beschreibt Zielgruppe, Kursstand, didaktische Leitlinien und geplante Themen. Lies es bei der Planung oder größeren Überarbeitung einer Lerneinheit.
- Verwende für neue oder grundlegend überarbeitete Unterrichtsmodule den Skill `$robotik-lerneinheit` unter `.agents/skills/robotik-lerneinheit/`.
- Verwende für eine reine Qualitätskontrolle oder Freigabe den standardmäßig nur berichtenden Skill `$robotik-modul-pruefen`.

## Inhalte und Quellen

- Entwickle Fachbegriffe aus beobachtbaren Bewegungen und technischen Entscheidungen. Die konkrete Ausgestaltung regeln Kursbriefing und Skill.
- Formuliere Erklärungen, Aufgaben und Unterrichtsskizzen eigenständig.
- Lokale Lehrkraftreferenzen liegen unter `referenzen/`. Sie dürfen ausgewertet, aber niemals nach `site/` kopiert, veröffentlicht oder aus dem Git-Ausschluss entfernt werden.
- Führe Mediennachweise mit Urheber, Quelle und Lizenz kompakt am Ende der jeweiligen Modulseite.
- Verarbeite keine Namen, Noten oder anderen personenbezogenen Daten von Lernenden.

## Änderungen an Unterrichtsseiten

- Bewahre das gemeinsame Erscheinungsbild über `site/robotik.css`; ergänze themenspezifische Styles und Skripte nur bei fachlichem Bedarf.
- Verändere `site/index.html` nur, wenn der Auftrag ausdrücklich die Startseite einschließt.
- Verwende relative Pfade für lokale Assets. Externe Skripte, Stylesheets und Bilder gehören nicht in die Unterrichtsseiten. YouTube-Videos werden nur über `youtube-nocookie.com` eingebettet.
- Erhalte semantische Struktur, Alternativtexte, Tastaturbedienbarkeit und eine funktionierende schmale ByCS-Ansicht.
- Berühre keine nicht zum Auftrag gehörenden Änderungen im Arbeitsverzeichnis.

## Prüfen und Veröffentlichen

- Wenn eine Modulseite oder eines ihrer Assets geändert wurde, führe aus:
  `python .agents/skills/robotik-modul-pruefen/scripts/pruefe-modul.py <Pfad-zur-Modulseite>`
- Behebe alle gemeldeten Fehler. Öffne die Seite danach im Browser und prüfe mindestens eine breite und eine schmale Ansicht sowie Navigation, Aufklapper, Animationen, Medien und Tastaturbedienung.
- Ein Push auf `main` veröffentlicht `site/` automatisch über GitHub Pages und damit in der ByCS-Einbettung. Committe oder pushe nur auf ausdrücklichen Auftrag der Lehrkraft.

## Dokumentation und Commits

- Dokumentiere Änderungen an Bedienung, Workflow, Skills oder Kursstand im selben Commit in der jeweils passenden Datei: `README.md`, `AGENTS.md`, `Kursbriefing.md` oder dem betroffenen Skill.
- Verwende eine aussagekräftige Commit-Nachricht, die Ergebnis und Zweck der Änderung beschreibt.
- Prüfe vor jedem Commit den vollständigen Diff und führe die für die Änderung vorgesehenen Prüfungen aus. Nimm keine sachfremden Dateien in den Commit auf.
