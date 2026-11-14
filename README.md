# Robotikkurs der Rudolf-Diesel-Fachschule

Dieses Repository enthält die HTML-Lerneinheiten für den Robotikkurs der Fachschule. Die Seiten werden über GitHub Pages veröffentlicht und in der ByCS-Lernplattform eingebettet.

## Veröffentlicht

- [Kursstart](https://volki1992.github.io/RobotikKurs_RDF/)
- [Modul 1 · Aufbau und Kinematik von Industrierobotern](https://volki1992.github.io/RobotikKurs_RDF/modul-1_kinematiken.html)

## Projektstruktur

| Pfad | Bedeutung |
| --- | --- |
| `Kursbriefing.md` | Zielgruppe, Kursstand, didaktische Leitlinien und weitere Planung |
| `site/` | alle veröffentlichten HTML-Seiten und Medien |
| `site/robotik.css` | gemeinsames Erscheinungsbild der Unterrichtsseiten |
| `referenzen/` | lokale, nicht veröffentlichte Lehrkraftquellen |
| `.agents/skills/robotik-lerneinheit/` | erstellt und überarbeitet Robotikmodule |
| `.agents/skills/robotik-modul-pruefen/` | prüft fertige Module unabhängig auf Veröffentlichungsreife |
| `AGENTS.md` | dauerhafte Arbeits- und Veröffentlichungsregeln des Projekts |

## Eine neue Lerneinheit beginnen

Im Teams-Projektordner **B Robotik** einen neuen Codex-Chat öffnen und beispielsweise schreiben:

```text
$robotik-lerneinheit
Thema: Koordinatensysteme und Werkzeugmittelpunkt
Erwartetes Schülerergebnis: …
Zeitrahmen: …
```

Zuerst werden die fachliche Gliederung, ein tragendes Anschauungsbeispiel und die Abschlussaufgabe abgestimmt. Danach wird die HTML-Seite ausgearbeitet.

Für eine unabhängige Kontrolle einer fertigen Seite kann ein neuer Chat mit `$robotik-modul-pruefen` und dem Pfad der Modulseite gestartet werden.

## Prüfen und veröffentlichen

Alle Module statisch prüfen:

```text
python .agents/skills/robotik-modul-pruefen/scripts/pruefe-modul.py
```

Eine einzelne Seite prüfen:

```text
python .agents/skills/robotik-modul-pruefen/scripts/pruefe-modul.py site/modul-1_kinematiken.html
```

Anschließend die Seite im Browser in breiter und schmaler Ansicht kontrollieren. Ein Push auf `main` startet die automatische Prüfung und veröffentlicht `site/` nur, wenn sie erfolgreich ist.
