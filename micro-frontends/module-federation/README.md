# Module-federation micro-frontends demo

## Instalacja zależności

Zakładamy, że poszczególne składowe systemu są w OSOBNYCH repo. Tutaj z uwagi na kontekst szkoleniowy umieszczamy wszystkie składowe (shell, employees, etc.) w 1 folderze. I tylko dla naszej szkoleniowej wygody udostępniamy 2 skrypty:
- `npm install` - który zainstaluje zależności w każdej składowej systemu
- `npm start` - który równolegle (`concurrently`) uruchomi wszystkie składowe

Normalnie (mając osobne repozytoria) trzeba byłoby manualnie instalować, uruchamiać i budować poszczególne składowe systemu.

## Uruchomienie

- `npm start`

## API

dodatkowo uruchamiamy szkoleniowe REST API:

- `cd <REPO>/api; npm start`
