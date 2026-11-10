---
name: robotik-modul-pruefen
description: Prüft bestehende HTML-Unterrichtsmodule des Robotikkurses statisch, visuell und didaktisch auf Veröffentlichungsreife. Verwenden für Qualitätskontrolle, Review oder Freigabe einer Seite unter site/; standardmäßig nur berichten und keine Dateien ändern.
---

# Robotikmodul prüfen

Prüfe eine fertige oder bestehende Unterrichtsseite unabhängig von ihrer Erstellung. Trenne zwingende Fehler von optionalen Verbesserungen und belege jeden Befund mit einer konkreten Stelle.

## Umfang klären

Bestimme die zu prüfende Modulseite. Ist kein Pfad genannt und genau eine geänderte Datei unter `site/modul-*.html` erkennbar, verwende diese; andernfalls frage nach der Zielseite.

Bei einer vollständigen Modulprüfung:

- lies `Kursbriefing.md` für Zielgruppe, Kursstand und didaktische Leitlinien,
- lies die Zielseite und ihre eingebundenen lokalen CSS-, JavaScript- und Mediendateien,
- nutze `site/modul-1.html` bei anderen Modulen als Referenz für fachliche Tiefe und Gestaltung, nicht als starre Schablone.

Bei einer ausdrücklich eng begrenzten Prüfung, etwa nur von Links oder schmaler Darstellung, lies nur die dafür erforderlichen Dateien.

## Automatisch prüfen

Führe aus:

```text
python .agents/skills/robotik-modul-pruefen/scripts/pruefe-modul.py <Pfad-zur-Modulseite>
```

Übernimm jeden gemeldeten Fehler unter **Muss korrigiert werden**. Das Skript kontrolliert unter anderem HTML-Grundstruktur, Sprungziele, eindeutige IDs, lokale Assets, Alternativtexte, eingebettete Medien, Quellenbereich, gemeinsame Styles und JavaScript-Syntax.

## Browserprüfung

Öffne die Seite und prüfe eine breite sowie eine schmale ByCS-Ansicht. Kontrolliere:

- keine abgeschnittenen, überlagerten oder horizontal herauslaufenden Inhalte,
- funktionierende Navigation, Aufklapper, Schaltflächen, Regler, Animationen und Medien,
- sichtbaren Tastaturfokus und eine sinnvolle Bedienreihenfolge,
- wiederholbare Animationen und verständliche Zustände vor, während und nach der Bewegung,
- keine Lade- oder JavaScriptfehler.

## Fachlich-didaktisch prüfen

Bewerte die Einheit anhand des konkreten Lernziels, nicht anhand einer festen Zahl von Kästen oder Beispielen:

- Fachbegriffe werden an einer beobachtbaren Bewegung oder technischen Entscheidung eingeführt.
- Erklärungen benennen, was sich bewegt, was fest bleibt und welche sicht- oder messbare Folge entsteht.
- Vergleiche verwenden möglichst dieselbe Ansicht, dasselbe Ziel und dieselben Randbedingungen.
- Bilder, Animationen und Videos tragen eine fachliche Aussage oder Beobachtungsfrage.
- Die Abschlussaufgabe verlangt Auswahl, Planung oder Beurteilung mit Begründung und lässt die technische Entscheidung offen.
- Quellen, Urheber und Lizenzen sind nachvollziehbar; lokale Lehrkraftreferenzen werden nicht veröffentlicht.
- Fachliche Tiefe, Sprache und Arbeitsumfang passen zu Fachschülern im zweiten Jahr mit wenig Programmiererfahrung.

Kennzeichne fachliche Aussagen als ungeklärt, wenn sie mit den verfügbaren Quellen nicht zuverlässig geprüft werden können. Erfinde keine Belege oder Musterlösungen.

## Bericht

Ändere bei einem reinen Prüfauftrag keine Dateien. Berichte in dieser Reihenfolge:

1. **Muss korrigiert werden** – Fehler mit Datei oder Abschnitt, Befund, Auswirkung und einer konkreten Korrekturrichtung. Wenn nichts vorliegt, schreibe: „Keine Punkte, die korrigiert werden müssen.“
2. **Wünschenswert** – höchstens fünf Verbesserungen, die den Unterrichtswert erhöhen, aber die Freigabe nicht blockieren.
3. **Bestanden** – kurz aufführen, welche automatische, visuelle und didaktische Prüfung erfolgreich war.

Committe oder veröffentliche nichts. Werden anschließend Korrekturen beauftragt, setze sie mit `$robotik-lerneinheit` um und wiederhole diese Prüfung.
