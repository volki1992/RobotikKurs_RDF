---
name: robotik-moduldesign
description: Überarbeitet die Gestaltung bestehender HTML-Unterrichtsmodule im Robotikkurs der Rudolf-Diesel-Fachschule nach Modul 1. Für Aufträge zu Modulstil, Kopfzeilen, Merkboxen, Robotergrafiken und der visuellen Verständlichkeit von Bewegungen und Bezugssystemen.
---

# Robotik-Moduldesign

Lies das Kursbriefing, die Zielseite und die aktuelle Referenz `site/modul-1_kinematiken.html` im Projekt. Prüfe ihre eingebundenen Stylesheets und bei interaktiven Bildern die tatsächlich verwendeten SVG- oder Canvas-Renderer. Verwende die bestehenden Komponenten und Klassen. Erhalte Fachtexte, Aufgaben, Links und Bedienung. Passe Bildlegenden an, wenn sich eine fachlich bedeutsame Markierung ändert.

## Gestaltung

- Übernimm den weißen Seitenkopf mit Modulkennung, fachlichem Titel und kurzer Unterzeile. Verwende rechts das Bild der Delta-Picker-Verpackungslinie und den kurzen orangefarbenen Balken aus Modul 1. Bei schmaler Ansicht folgt das Bild unter dem Text. Die Abschnittsnavigation führt zu den Themen der Zielseite.
- Verwende die Typografie und Abstände der Vorlage, dunkle Schrift, feine graue Trennlinien und sparsame orange Akzente. Quellen, Bildrechte und externe Medienverweise stehen kompakt am Seitenende.
- Gib 2D-Erklärbildern, Achsskizzen und Stationszeichnungen einen weißen bis hellgrauen Hintergrund. Dazu zählen auch perspektivisch gezeichnete Stationsskizzen. Zeige räumliche Robotermodelle und Arbeitsraumvolumen auf dunkelblau-anthrazitfarbener Fläche mit dezentem Bodenraster. Verwende für Arbeitsräume transparentes Orange und lesbare Konturen.
- Gestalte Gehäuse und bewegliche Armglieder in Industrieorange. Zeichne Gelenke mit graphitgrauem Außenring, metallischer Innenfläche und heller Nabe. Greifer erhalten ein orangefarbenes Gehäuse und metallgraue Backen. Führungen und schlanke Koppelstangen können metallgrau bleiben. Übertrage die Materiallogik auch auf Animationen. Belasse Herstellerfotos in ihren Originalfarben.
- Nutze für Merkboxen das Muster `.merkbox` mit heller Fläche, feinem Rahmen, vier Pixel breiter orangefarbener Linie links und einem Ausrufezeichen im orangefarbenen Kreis. Auf „Merke“ und die kurze Erklärung folgt der fett gesetzte Merksatz.
- Gib interaktiven Kacheln ein erkennbares Bild und einen kurzen Titel. Öffne Erklärung oder Modell an der Kachel. Animationen erhalten eine Wiederholungsmöglichkeit.

## Fachliche Lesbarkeit

- **Beschriftungen.** Platziere Bezeichnungen, Maßangaben, Plus-Schaltflächen und geöffnete Erklärkacheln so, dass die Texte einander weder überdecken noch die gerade erklärte Stelle verdecken. Setze bei Platzmangel Beschriftungen außerhalb der Zeichnung und verbinde sie mit eindeutigen Führungslinien.
- **Lage der Pfeile.** Eine Führungslinie endet am bezeichneten Bauteil. Ein Translationspfeil verläuft parallel zur tatsächlichen Führung. Ein Rotationspfeil umschließt die richtige Drehachse in einer zur Achse senkrechten Ebene. Zeichne den Bogen in der gewählten Perspektive und prüfe die Pfeilspitze gegen die gezeigte Bewegung. Türkis kennzeichnet die Bewegung.
- **Koordinatensysteme.** Kennzeichne jedes Bezugssystem mit Namen, Ursprung und eindeutig zugeordneten Achsen. Zeige positive Richtungen und prüfe die Händigkeit. Halte die verschiedenen Achsenkreuze, Achsennamen und Pfeilspitzen optisch getrennt. Bei tatsächlich deckungsgleichen Ursprüngen oder Achsen verwende synchronisierte Teilansichten oder umschaltbare Ebenen mit derselben Geometrie. Erhalte dabei die fachlich korrekte Lage der Ursprünge.
- **Bewegungsgröße.** Wähle Bildausschnitt, Ansicht und Bewegungsumfang so, dass Schüler Start- und Endlage bei normaler ByCS-Darstellung auf Anhieb unterscheiden können. Die relevante Bewegung muss auch innerhalb der kleinsten Kachel sichtbar sein. Hilfreich sind eine feste Referenz, eine dezente Startkontur oder eine Bahnspur. Bei maßgebundenen Aufgaben vergrößere den Ausschnitt und erhalte den angegebenen Weg oder Winkel.

## Prüfung

Öffne die überarbeitete Seite im Browser auf Desktop- und schmaler ByCS-Breite. Prüfe die betroffenen Zeichnungen auch mit eingeblendeten Beschriftungen. Spiele Animationen vollständig ab und wiederhole sie. Vergleiche Anfang, Zwischenstellung und Ende mit den Bewegungspfeilen. Prüfe bei drehbaren Modellen auch schräge Ansichten auf verdeckte Achsen und überlagerte Labels. Kontrolliere Bildpfade, Navigation und die Bedienung der geänderten Elemente.
