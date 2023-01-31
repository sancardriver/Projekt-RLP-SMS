# Entwicklungsumgebung

## Voraussetzung
- git >= 2.39.1
- npm  >= 9.4.0
- ddev >= 1.21.4

## Entwicklungsumgebung installieren

1. Projekt-Repository clonen
   ```sh
   # Via HTTPs
   git clone https://github.com/sancardriver/Projekt-RLP-SMS.git
   # Via SSH
   git clone git@github.com:sancardriver/Projekt-RLP-SMS.git
   ```
2. Im Verzeichnis alle notwendigen Pakete installieren
   ```sh
   npm install
   ```

## Automation mit Gulp
Dieses Projekt verwendet Gulp um Abläufe zu automatisieren. Folgende Befehle stehen zur Verfügung:

1. Mit `gulp buildDev` wird im Build/Development:
   - die `style.css` wird erzeugt
   - die `style-dark.css` wird erzeugt
   - die Javascript-Dateien werden gebündelt
   - die `service-worker.js` wird erzeugt
2. Mit `gulp buildLive` wird aus dem Build/Development der Build/Productive erzeugt.
3. Mit `gulp watch` werden die Verzeichnise überwacht. Bei Änderungen an den `js`- oder `scss`-Dateien werden diese neu in den Build/Development geschrieben.
