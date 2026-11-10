---
name: robotik-lerneinheit
description: Erstellt und überarbeitet statische HTML-Lerneinheiten für den Robotikkurs der Rudolf-Diesel-Fachschule im vorhandenen Layout und mit dem didaktischen Muster von Modul 1. Verwenden für Unterrichtsseiten unter site/, nicht für allgemeine Webseiten oder die Kurs-Startseite.
---

# Robotik-Lerneinheit

Erstelle fachlich belastbare, in ByCS nutzbare HTML-Einheiten, die wenige neue Begriffe aus beobachtbaren Roboterbewegungen und technischen Entscheidungen entwickeln.

## Projektkontext lesen

Lies vor jeder Erstellung oder größeren Überarbeitung vollständig:

1. `Kursbriefing.md` für Zielgruppe, Kursstand, geplante Reihenfolge und Veröffentlichungsweg.
2. `site/modul-1.html` als Referenz für Layout, fachliche Tiefe, Mediennutzung, Beobachtungsfragen und Transferaufgabe.

Prüfe bei einer bestehenden Einheit außerdem deren HTML sowie alle von ihr eingebundenen lokalen CSS-, JavaScript- und Mediendateien. Behandle Modul 1 als Qualitäts- und Stilreferenz, nicht als starre Schablone.

## Einheit planen

Kläre für eine neue Einheit zunächst:

- Lernziel,
- vorausgesetztes Wissen,
- realistischen Zeitbedarf,
- erwartetes, beobachtbares Schülerergebnis.

Falls Thema, Schülerergebnis oder Zeitrahmen fehlen und nicht sinnvoll aus dem Auftrag hervorgehen, frage gezielt danach. Lege anschließend zuerst eine fachliche Gliederung, ein tragendes Anschauungsbeispiel und die Abschlussaufgabe zur Abstimmung vor. Arbeite die HTML-Seite erst danach aus, außer der Nutzer verlangt ausdrücklich eine vollständige Ausarbeitung in einem Schritt.

Der Zeitbedarf gehört in die Unterrichtsplanung und nicht automatisch auf die Schülerseite. Nimm Lernziel, Voraussetzungen oder erwartetes Ergebnis nur dann sichtbar in die HTML-Seite auf, wenn sie für die Lernenden oder den konkreten Auftrag hilfreich sind.

Führe nur so viele Fachbegriffe ein, wie für die zentrale technische Entscheidung nötig sind. Setze bis zur späteren Softwarephase keine verfügbare Robotiksoftware voraus: Nutze Skizzen, Fallentscheidungen, Beobachtungen und Ablaufbeschreibungen, solange das Kursbriefing keinen anderen Stand nennt.

## Begriffe aus Bewegung entwickeln

Beginne eine Erklärung bevorzugt mit einer konkreten Handlung des Roboters oder Werkzeugs: Was bewegt sich, in welche Richtung, um welchen festen Punkt, entlang welcher Bahn oder relativ zu welchem Objekt? Lenke die Aufmerksamkeit mit einer kurzen Beobachtungsfrage auf das entscheidende Merkmal. Benenne danach den Fachbegriff und verbinde ihn mit einer mess- oder sichtbaren Folge, etwa Weg statt Winkel, Position statt Orientierung oder Bahnform statt Endpunkt.

Nutze ein technisches Beispiel, bei dem der Begriff eine reale Entscheidung erklärt. Vermeide Definitionen, die vor der beobachtbaren Bewegung stehen, sowie Beispiele ohne erkennbare Auswirkung auf die Aufgabe.

## Technische Unterschiede visualisieren

Wähle die Darstellungsform nach dem fachlichen Verhältnis:

- Animation oder kurze Bewegungsfolge für zeitliche Abläufe und Achsbewegungen,
- beschriftete Skizze oder SVG für räumliche Beziehungen,
- direktes Gegenüber oder Tabelle für mehrere Kriterien,
- Foto oder Video für den Bezug zu einer realen Anwendung.

Vergleiche Alternativen unter denselben Randbedingungen und möglichst mit derselben Ansicht sowie demselben Ziel. Markiere, was sich bewegt, was fest bleibt und woran Lernende den Unterschied erkennen. Verbinde jedes Medium mit einer konkreten Beobachtungsfrage oder Aussage; dekorative Medien genügen nicht. Animationen müssen wiederholbar sein. Die Anzahl von Beispielen, Kacheln, Kästen und Vergleichsmerkmalen richtet sich nach dem Thema und darf ausdrücklich von Modul 1 abweichen.

## Aufgaben gestalten

Baue kurze Aufgaben dort ein, wo Lernende eine Beobachtung deuten oder eine technische Unterscheidung anwenden können. Nutze aufklappbare Lösungen, wenn unmittelbare Selbstkontrolle didaktisch sinnvoll ist. Gib der Abschlussaufgabe einen eigenen, klar erkennbaren Bereich.

Beende die Einheit mit einer Transferaufgabe in einem neuen, aber verständlichen Anwendungsszenario. Sie soll mindestens eine Auswahl, Planung oder Beurteilung verlangen und eine Begründung anhand gegebener technischer Randbedingungen fordern. Nutze Skizzen, um die Anforderungen der Situation sichtbar zu machen, ohne die technische Entscheidung vorwegzunehmen. Lege weder Musterlösung noch Abgabemedium fest, sofern der Auftrag dies nicht ausdrücklich verlangt.

## Technische und gestalterische Einbindung

- Verwende die Schriftfolge Inter, Aptos, Segoe UI, Arial, die gelblichen Akzente und die Interaktionsmuster des Projekts. Überschriften benennen den technischen Gegenstand; die Inhaltsfolge entwickelt einen fachlichen Zusammenhang. Binde `site/robotik.css` über den zur HTML-Datei passenden relativen Pfad ein und ergänze nur themenspezifische Styles oder Skripte.
- Erzeuge eine semantische, responsive, per Tastatur bedienbare Seite mit sichtbarem Fokus, aussagekräftigen Überschriften, Alternativtexten sowie Titeln für eingebettete Medien.
- Verwende relative Pfade für lokale Assets, damit die veröffentlichte Seite über GitHub Pages in ByCS eingebettet werden kann. Vermeide Abhängigkeiten von lokalen Dateien, lokalen Servern oder einem Build-Schritt.
- Verändere `site/index.html` nicht, sofern der Auftrag die freigegebene Startseite nicht ausdrücklich einschließt.
- Die Lehrkraftmaterialien unter `referenzen/` dürfen fachlich ausgewertet, aber nicht veröffentlicht, verlinkt oder aus dem Git-Ausschluss geholt werden. Formuliere Erklärungen und Aufgaben eigenständig.
- Führe Bild-, Video- und sonstige Mediennachweise mit Urheber, Quelle und Lizenz auf. Nutze externe Videos sparsam und datenschutzbewusst; übernehme bei YouTube das `youtube-nocookie.com`-Muster aus Modul 1.

## Abschlussprüfung

Verwende nach der Ausarbeitung oder einer größeren Überarbeitung `$robotik-modul-pruefen` für die geänderte Seite. Behebe alle Punkte unter **Muss korrigiert werden** und wiederhole die Prüfung, bis dort keine Punkte mehr stehen. Setze optionale Vorschläge nur um, wenn sie zum Auftrag passen.

Eine Einheit ist erst fertig, wenn die automatische, visuelle und didaktische Prüfung bestanden ist und das erwartete Schülerergebnis tatsächlich beobachtbar bleibt.
