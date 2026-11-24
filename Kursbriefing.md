# Kursbriefing · Robotik an der Rudolf-Diesel-Fachschule

## Zielgruppe und Kursziel

Der Kurs richtet sich an Fachschüler im zweiten Jahr mit wenig Programmiererfahrung. Die Schüler sollen industrielle Robotersysteme verstehen, Bewegungen planen und einfache Abläufe programmieren. Die fachliche Tiefe orientiert sich an Entscheidungen, die sie selbst treffen können. Bei einer Klebenaht über Eck sollen sie beispielsweise erklären können, warum sowohl die Bahn der Düsenspitze als auch der Winkel der Düse zur Oberfläche wichtig sind.

## Kursstand und weitere Planung

| Stand | Inhalt |
| --- | --- |
| Veröffentlicht | Modul 1 „Aufbau und Kinematik von Industrierobotern“. Die Einheit ist für 60–90 Minuten geplant und funktioniert ohne Robotiksoftware. |
| Veröffentlicht | [Modul 2 „Koordinatensysteme und TCP“](https://volki1992.github.io/RobotikKurs_RDF/modul-2_koordinaten.html) (25–30 Minuten). Bezugssysteme und zwei Z-Fahrten über 40 mm untersuchen (10–12 min), am Schieberegler Gelenkstellungen und TCP-Position vergleichen (10 min), sechs Multiple-Choice-Fragen zu Bezugssystemen, TCP und Koordinaten bearbeiten (5–8 min). |
| Veröffentlicht | [Modul 3 „Roboterbewegungen programmieren“](https://volki1992.github.io/RobotikKurs_RDF/modul-3_bewegungen.html) (Theorie, ca. 50–60 Minuten). Absolute und relative Zielangaben im XY-Raster, PTP und LIN am Gelenkarm, Singularität bei deckungsgleicher Sockel- und Werkzeugachse im drehbaren 3D-Modell sowie eine Programmieraufgabe mit bemaßter Klebestation und fünf Auswahlfragen. |
| Weitere Theoriethemen | Bahnplanung, einfache Programmabläufe sowie die Rolle von B&R mapp Motion. Reihenfolge und Dauer sind offen. Eine Kurzarbeit soll die erarbeiteten Grundlagen prüfen. |
| Veröffentlicht | [Modul 4 „Sicherheit in der Robotik“](https://volki1992.github.io/RobotikKurs_RDF/modul-4_sicherheit.html), ca. 50–60 Minuten plus 15–20 Minuten Selbsttest. Drei fachsystematische Abschnitte an einer Handhabungszelle: Gefährdungen, Risikobeurteilung und Normen (20 min); Schutzeinrichtungen und Wiederanlauf (15–20 min); Einrichten, Zustimmung, Not-Halt und gespeicherte Energie (15–20 min). Normenvergleich: DIN EN ISO 12100, 10218-1, 10218-2 und 13850; Roboternormen auf Grundlage der ISO-Ausgaben 2025. Kompakte Texte, eigene Vektorgrafiken, zwei bedienbare Lehrmodelle und zwei Robotercrash-Videos mit Beobachtungsfragen. Grundlage: internes H3-Skript, fachlich präzisiert anhand ISO/BGHM/DGUV. Ohne Robotiksoftware. Selbsttest mit fünf Aufgaben: Normenzuordnung, bildgestützte Schutzentscheidung mit Begründung, drei Betriebszustände, offene Beurteilung einer Störungsbeseitigung und qualitative Risikobeurteilung von vier unabhängigen Änderungen mit gestufter Schwierigkeit (zweimal leicht, einmal mittel, einmal anspruchsvoll). |
| Spätere Praxisphase | Die übergeordnete Robotikaufgabe in FEE ScreenSim V5 beginnt nach der Theorie und knüpft an den vorhandenen FEE-Kurs an. Station und Arbeitsauftrag sind noch offen. B&R Automation Studio 6 war bei der Planung noch nicht verfügbar. Vor der Praxiseinheit Softwarestand, Simulationsprojekt und Anbindung prüfen. |

## Modul 1 als Referenz

Die [Unterrichtsseite](site/modul-1_kinematiken.html) zeigt die angestrebte fachliche Tiefe und Gestaltung. Sie führt von der einzelnen Bewegung zur Auswahl eines Roboters.

1. **Aufbau und Kinematik.** Am beschrifteten Knickarm lassen sich Glied, Gelenk und Drehachse unterscheiden. Wiederholbare Animationen zeigen Verschiebung und Drehung. Anschließend vergleichen die Schüler serielle und parallele Gelenkketten.
2. **Typische Roboterbauformen.** Kacheln für Portal, SCARA, Knickarm und Delta verbinden reale Bilder, Bewegungsmodelle, drehbare Arbeitsräume und typische Anwendungen. SCARA und Knickarm fahren dieselbe Zielmarke an. Am Ende der Bewegung wird sichtbar, welche Bauform das Werkzeug kippen kann.
3. **Selbsttest (5 Minuten).** Die vier illustrierten Stationen bilden den ersten Teil. Die Schüler wählen eine Bauform, überlegen sich einen Grund und drehen die Kachel zum Lösungsvorschlag mit Begründung um. Anschließend beantworten sie zwei Multiple-Choice-Fragen zu Achsart und Parallelkinematik mit direkter Rückmeldung.

## Gestaltung weiterer Einheiten

- Überschriften benennen den technischen Gegenstand. Die Inhaltsfolge soll einen Zusammenhang entwickeln, etwa vom Aufbau eines Gelenks zur Bewegung des Werkzeugs. Der Zeitbedarf gehört in die Unterrichtsplanung.
- Fachbegriffe dort einführen, wo die Schüler sie an einer Bewegung oder Entscheidung erkennen können. Kurze Absätze, Skizzen und gezielte Beobachtungsfragen halten die Seite lesbar. Längere, thematisch gegliederte HTML-Seiten sind erwünscht.
- Die Darstellung nach dem Lernziel wählen. Für Bauteile eignen sich eindeutig zugeordnete Bildmarken, für Bewegungen wiederholbare Animationen, für räumliche Beziehungen drehbare Modelle. Für Vergleiche möglichst dieselbe Ansicht und dasselbe Ziel verwenden.
- Die Abschlussaufgabe erhält einen eigenen Bereich. Skizzen zeigen die Anforderungen der Situation und lassen die technische Entscheidung offen. Anzahl der Fälle, Kacheln und Medien richten sich nach dem jeweiligen Thema.
- Roboter einheitlich zeichnen: Glieder orange, Gelenke grau und Greifer wie in Modul 1. Für 2D-Zeichnungen einen hellen, für 3D-Ansichten einen dunklen Hintergrund verwenden.
- Grafiken auch in der schmalen ByCS-Ansicht prüfen. Beschriftungen müssen frei stehen. Hinweislinien enden am bezeichneten Bauteil. Rotationspfeile verlaufen um die dargestellte Drehachse, Translationspfeile entlang der Bewegungsrichtung. Bei mehreren Koordinatensystemen müssen Ursprung, Achsen und Beschriftungen eindeutig zuordenbar bleiben.
- Bei Animationen Blickrichtung und Bewegungshub so wählen, dass die Lernenden die Bewegung des Gelenks oder Werkzeugs auch in der eingebetteten Ansicht deutlich erkennen können.
- Layoutgrundlage ist das [gemeinsame Stylesheet](site/robotik.css) mit der Schriftfolge Inter, Aptos, Segoe UI, Arial im Stil von Modul 1. Die Kopfzeile zeigt rechts die Deltapicker. Merkboxen heben einen kurzen Merksatz mit einem Ausrufezeichen als Piktogramm hervor. Quellen, Bildrechte und externe Videolinks stehen kompakt am Seitenende. Interaktive Elemente auch bei schmaler ByCS-Ansicht prüfen.

## Mini-Abschlusstest je Modul

Jedes Modul endet mit einem unbenoteten Selbsttest zur Vorbereitung auf die Kurzarbeit. Richtwert sind fünf Minuten. Aufgabenformat, Anzahl und Reihenfolge richten sich nach dem Lernziel der jeweiligen Einheit. Eine fachliche Abschlussaufgabe kann Teil des Selbsttests sein.

Die Lernenden können ihre Antworten direkt auf der Seite überprüfen. Bei Auswahlfragen kennzeichnen Text und Symbol richtige und falsche Antworten. Ein konkreter Hinweis unterstützt einen weiteren Versuch. Für offene Fragen lässt sich ein begründeter Lösungsvorschlag einblenden. Die Selbstkontrolle erfolgt ohne Namen oder Übermittlung von Ergebnissen. Für eine dokumentierte Auswertung durch die Lehrkraft eignet sich bei Bedarf eine eigene ByCS-Testaktivität.

Alle vier Module enthalten Selbsttests. Modul 4 nutzt fünf Aufgaben für etwa 15–20 Minuten: Zuordnungen und Auswahlantworten erhalten direkte Rückmeldung mit Text und Symbol; die offene Begründung wird anhand eines aufklappbaren Lösungsvorschlags selbst verglichen. Offene Begründungen und die Risikobeurteilung halten die Lernenden in ihren eigenen Notizen fest; Textfelder auf der Seite entfallen. Auswahlantworten können zurückgesetzt werden. In Modul 2 und Modul 4 öffnet „Als PDF exportieren“ den Druckdialog mit Aufgaben und Lösungen. In Modul 4 entspricht der Exportbutton der Gestaltung von Modul 3; Erläuterungen und Lösungen werden für den Druck geöffnet und danach wieder in ihren vorherigen Zustand versetzt. Videos erscheinen im Druck als Quellenlinks.

| Modul | Möglicher Gegenstand des Selbsttests |
| --- | --- |
| 1 · Aufbau und Kinematik | Vier Stationskacheln mit Lösungsvorschlägen, danach zwei Multiple-Choice-Fragen. |
| 2 · Koordinatensysteme und TCP | Sechs Auswahlfragen zu Werkstück-, Welt- und Werkzeugbezug, TCP sowie Achs- und kartesischen Koordinaten. |
| 3 · Roboterbewegungen programmieren | PTP und LIN unterscheiden, die Bewegungsart für eine gerade Klebenaht wählen und am bekannten 3D-Modell erklären, welche Bewegungsmöglichkeit bei deckungsgleichen Achsen verloren geht. |
| 4 · Sicherheit in der Robotik | Vier technische Fragestellungen den Normen zuordnen; bei schwereren Werkstücken eine ergänzende Absicherung samt Begründung wählen; drei Betriebszustände beurteilen; einen Eingriff nach Not-Halt anhand verbleibender Gefährdungen und passender Maßnahmen beurteilen; vier unabhängige Änderungen beurteilen: bessere Führung und automatischer Wiederanlauf (leicht), verbreiterter Materialtunnel (mittel), schwerere Last bei niedrigerer Programmgeschwindigkeit (anspruchsvoll). |

## Projekt, Quellen und Veröffentlichung

Der Arbeitsstand liegt im synchronisierten Teams-Projektordner **B Robotik**. Der [Prototyp](site/index.html) ist die Startseite. GitHub Pages veröffentlicht den Inhalt von `site/` bei einem Push auf `main`. ByCS bindet die jeweilige Modulseite per iframe mit stabiler URL ein. [Veröffentlichtes Modul 1](https://volki1992.github.io/RobotikKurs_RDF/modul-1_kinematiken.html)

Die Lehrkraftreferenzen liegen im Git-ignorierten Ordner `referenzen/`. Für Modul 1 sind `Robotikskript.pdf` (S. 6, Abb. 4) und `TM1115-ENG_Basics_of_MCR_V2302.pdf` (S. 11 und 14) fachliche Grundlagen. Aufgaben, Texte und Unterrichtsskizzen werden eigenständig erstellt. Die Referenz-PDFs bleiben außerhalb von GitHub.

## Übergabe für das nächste Modul

Für eine neue Einheit einen eigenen Chat im Teams-Projekt verwenden. Der vorhandene Projektskill [robotik-lerneinheit](.agents/skills/robotik-lerneinheit/SKILL.md) nutzt dieses Briefing und Modul 1 als Referenz. Zum Start mit `$robotik-lerneinheit` das Thema, das gewünschte Schülerergebnis und den Zeitrahmen angeben. Zuerst die fachliche Gliederung, ein geeignetes Anschauungsbeispiel und die Abschlussaufgabe abstimmen. Anschließend die HTML-Seite ausarbeiten. Für die gestalterische Überarbeitung bestehender Module den Skill [robotik-moduldesign](.agents/skills/robotik-moduldesign/SKILL.md) verwenden.
