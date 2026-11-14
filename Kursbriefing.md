# Kursbriefing · Robotik an der Rudolf-Diesel-Fachschule

## Zielgruppe und Kursziel

Der Kurs richtet sich an Fachschüler im zweiten Jahr mit wenig Programmiererfahrung. Die Schüler sollen industrielle Robotersysteme verstehen, Bewegungen planen und einfache Abläufe programmieren. Die fachliche Tiefe orientiert sich an Entscheidungen, die sie selbst treffen können. Bei einer Klebenaht über Eck sollen sie beispielsweise erklären können, warum sowohl die Bahn der Düsenspitze als auch der Winkel der Düse zur Oberfläche wichtig sind.

## Kursstand und weitere Planung

| Stand | Inhalt |
| --- | --- |
| Veröffentlicht | Modul 1 „Aufbau und Kinematik von Industrierobotern“. Die Einheit ist für 60–90 Minuten geplant und funktioniert ohne Robotiksoftware. |
| Lokal ausgearbeitet | Modul 2 „Koordinatensysteme und TCP“ (25–30 Minuten). Bezugssysteme und zwei Z-Fahrten über 40 mm untersuchen (10–12 min), am Schieberegler Gelenkstellungen und TCP-Position vergleichen (10 min), Bezugswahl bei der Steckermontage begründen (5–8 min). |
| Lokal ausgearbeitet | Modul 3 „Roboterbewegungen programmieren“ (Theorie, ca. 45–50 Minuten). Absolute und relative Zielangaben im XY-Raster, relativer Hub in zwei Bezugssystemen, PTP und LIN am Gelenkarm sowie ein vierteiliger Klebeablauf. Quiz für einen späteren Arbeitsschritt vorgesehen. |
| Weitere Theoriethemen | Bahnplanung, einfache Programmabläufe sowie die Rolle von B&R mapp Motion. Reihenfolge und Dauer sind offen. Eine Kurzarbeit soll die erarbeiteten Grundlagen prüfen. |
| Spätere Praxisphase | Die übergeordnete Robotikaufgabe in FEE ScreenSim V5 beginnt nach der Theorie und knüpft an den vorhandenen FEE-Kurs an. Station und Arbeitsauftrag sind noch offen. B&R Automation Studio 6 war bei der Planung noch nicht verfügbar. Vor der Praxiseinheit Softwarestand, Simulationsprojekt und Anbindung prüfen. |

## Modul 1 als Referenz

Die [Unterrichtsseite](site/modul-1_kinematiken.html) zeigt die angestrebte fachliche Tiefe und Gestaltung. Sie führt von der einzelnen Bewegung zur Auswahl eines Roboters.

1. **Aufbau und Kinematik.** Am beschrifteten Knickarm lassen sich Glied, Gelenk und Drehachse unterscheiden. Wiederholbare Animationen zeigen Verschiebung und Drehung. Ein markiertes Werkstück veranschaulicht die drei Freiheitsgrade der Position und die drei der Orientierung. Anschließend vergleichen die Schüler serielle und parallele Gelenkketten.
2. **Typische Roboterbauformen.** Kacheln für Portal, SCARA, Knickarm und Delta verbinden reale Bilder, Bewegungsmodelle, drehbare Arbeitsräume und typische Anwendungen. SCARA und Knickarm fahren dieselbe Zielmarke an. Am Ende der Bewegung wird sichtbar, welche Bauform das Werkzeug kippen kann.
3. **Abschlussaufgabe.** Vier illustrierte Stationen behandeln Blechlager, Pralinenverpackung, Gehäuseprüfung und Steckermontage. Der Schülerauftrag lautet „Wählt für jede der vier Stationen eine geeignete Roboterbauform und begründet eure Wahl kurz anhand der Anforderungen.“ Die Schülerseite enthält keine Musterlösungen oder Vorgaben zum Abgabemedium.

## Gestaltung weiterer Einheiten

- Überschriften benennen den technischen Gegenstand. Die Inhaltsfolge soll einen Zusammenhang entwickeln, etwa vom Aufbau eines Gelenks zur Bewegung des Werkzeugs. Der Zeitbedarf gehört in die Unterrichtsplanung.
- Fachbegriffe dort einführen, wo die Schüler sie an einer Bewegung oder Entscheidung erkennen können. Kurze Absätze, Skizzen und gezielte Beobachtungsfragen halten die Seite lesbar. Längere, thematisch gegliederte HTML-Seiten sind erwünscht.
- Die Darstellung nach dem Lernziel wählen. Für Bauteile eignen sich eindeutig zugeordnete Bildmarken, für Bewegungen wiederholbare Animationen, für räumliche Beziehungen drehbare Modelle. Für Vergleiche möglichst dieselbe Ansicht und dasselbe Ziel verwenden.
- Die Abschlussaufgabe erhält einen eigenen Bereich. Skizzen zeigen die Anforderungen der Situation und lassen die technische Entscheidung offen. Anzahl der Fälle, Kacheln und Medien richten sich nach dem jeweiligen Thema.
- Roboter einheitlich zeichnen: Glieder orange, Gelenke grau und Greifer wie in Modul 1. Für 2D-Zeichnungen einen hellen, für 3D-Ansichten einen dunklen Hintergrund verwenden.
- Grafiken auch in der schmalen ByCS-Ansicht prüfen. Beschriftungen müssen frei stehen. Hinweislinien enden am bezeichneten Bauteil. Rotationspfeile verlaufen um die dargestellte Drehachse, Translationspfeile entlang der Bewegungsrichtung. Bei mehreren Koordinatensystemen müssen Ursprung, Achsen und Beschriftungen eindeutig zuordenbar bleiben.
- Bei Animationen Blickrichtung und Bewegungshub so wählen, dass die Lernenden die Bewegung des Gelenks oder Werkzeugs auch in der eingebetteten Ansicht deutlich erkennen können.
- Layoutgrundlage ist das [gemeinsame Stylesheet](site/robotik.css) mit der Schriftfolge Inter, Aptos, Segoe UI, Arial im Stil von Modul 1. Die Kopfzeile zeigt rechts die Deltapicker. Merkboxen heben einen kurzen Merksatz mit einem Ausrufezeichen als Piktogramm hervor. Quellen, Bildrechte und externe Videolinks stehen kompakt am Seitenende. Interaktive Elemente auch bei schmaler ByCS-Ansicht prüfen.

## Projekt, Quellen und Veröffentlichung

Der Arbeitsstand liegt im synchronisierten Teams-Projektordner **B Robotik**. Der [Prototyp](site/index.html) ist die Startseite. GitHub Pages veröffentlicht den Inhalt von `site/` bei einem Push auf `main`. ByCS bindet die jeweilige Modulseite per iframe mit stabiler URL ein. [Veröffentlichtes Modul 1](https://volki1992.github.io/RobotikKurs_RDF/modul-1_kinematiken.html)

Die Lehrkraftreferenzen liegen im Git-ignorierten Ordner `referenzen/`. Für Modul 1 sind `Robotikskript.pdf` (S. 6, Abb. 4) und `TM1115-ENG_Basics_of_MCR_V2302.pdf` (S. 11 und 14) fachliche Grundlagen. Aufgaben, Texte und Unterrichtsskizzen werden eigenständig erstellt. Die Referenz-PDFs bleiben außerhalb von GitHub.

## Übergabe für das nächste Modul

Für eine neue Einheit einen eigenen Chat im Teams-Projekt verwenden. Der vorhandene Projektskill [robotik-lerneinheit](.agents/skills/robotik-lerneinheit/SKILL.md) nutzt dieses Briefing und Modul 1 als Referenz. Zum Start mit `$robotik-lerneinheit` das Thema, das gewünschte Schülerergebnis und den Zeitrahmen angeben. Zuerst die fachliche Gliederung, ein geeignetes Anschauungsbeispiel und die Abschlussaufgabe abstimmen. Anschließend die HTML-Seite ausarbeiten. Für die gestalterische Überarbeitung bestehender Module den Skill [robotik-moduldesign](.agents/skills/robotik-moduldesign/SKILL.md) verwenden.
