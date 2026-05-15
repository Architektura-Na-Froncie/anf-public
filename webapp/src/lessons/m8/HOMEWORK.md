# Moduł 8 - Reaktywność - PRACA DOMOWA

## Kantor walutowy

- plik: `src/ui/currency-exchange/CurrencyExchange.tsx`
- storybook: sekcja *Currency Exchange/Currency Exchange*
- zadania:
  - nawiąż połączenie z websocketem obsługującym zmiany kursów walut
  - wykonaj niezbędne obliczenia tak, aby aplikacja cały czas wyświetlała aktualne kursy walut wraz z trendem (czy kurs rośnie czy maleje)
  - wykorzystaj RxJS do przetwarzania danych czasu rzeczywistego
  - wyenkapsuluj klienta websocket w taki sposób, aby komponent Reaktowy (warstwa UI) bezpośrednio nie miał z nim styku, żeby komponent nie musiał umieć obsługiwać konkretnej biblioteki, konkretnej technologii, sposobu komunikacji, protokołu itp. Komponent korzysta z publicznego API, zaś detale są prywatne.

### websocket / Socket.IO

- uruchamiamy go tą samą komendą, którą uruchamiamy API RESTowe - tyle, że dodajemy flagę `--curr` z linii poleceń. Czyli w folderze `api` uruchamiamy `npm start -- --curr`. Po uruchomieniu powinniśmy widzieć w logu konsoli poniższą linijkę: `CONFIG > Currency Service turned ON (port: 3579)`
- plik `src/ui/currency-exchange/CurrencyExchange.tsx` zawiera podstawowy kod tworzący klienta websocketa, wysyłanie wiadomości oraz ich otrzymywanie
- kod serwera websocketowego jest minimalistyczny, służy jedynie pracy domowej i w żadnym wypadku nie nadaje się do stosowania w aplikacji produkcyjnej :) dla zainteresowanych: `<REPO>/api/currency`
- **protokół websocketowy**:
  - są 4 obsługiwane waluty: 'USD', 'EUR', 'GBP', 'CHF'
  - websocket *nie* podaje aktualnego kursu, tylko zmianę (różnicę, np. +0.1 oznacza, że kurs waluty wzrósł o jedną dziesiątą)
  - serwer wysyła zdarzenie `init` - wysyłane tylko raz, inicjalnie
  - serwer wysyła zdarzenie `update` - wysyłane wielokrotnie, pojedyncze zmiany kursów walut
    - obydwa zdarzenia wysyłane przez serwer zostały otypowane - typy znajdują się w pliku `webapp/src/ui/currency-exchange/currency.ts`
  - klient wysyła zdarzenie `request` - wysyłane 0 lub wiele razy; zmienia preferencje, o zmianie których walut klient chce być informowany, np: `socket.emit('request', { currencies: [ 'USD', 'EUR', 'GBP', 'CHF' ] })` oznacza subskrypcję zmian wszystkich 4 walut, zaś `socket.emit('request', { currencies: [ 'EUR' ] })` tylko zmian 'EUR'.
- w zależności od narzędzia może być potrzebna zmiana protokołu na ws/wss dla `CURRENCY_SVC_URL` (w pliku `webapp/src/ui/currency-exchange/config.ts`)

**UWAGA:** Domyślna implementacja serwera oparta jest na Socket.IO, co implikuje kierunek rozwiązania. Dostępna jest również implementacja oparta o "czyste" websockety, ale uruchomienie jej wymaga ręcznego przepięcia w pliku `<REPO>/api/server.js`. Serwer websocketowy wysyła i odbiera komunikaty w postaci `{ type: string, data: any }`.

## Proces biznesowy: Exam

- **zaimplementuj flow** egzaminu przy pomocy **MobX**. Proces Egzaminu implementowaliśmy w Module 4 Zarządzanie Stanem (dokładny opis procesu tutaj: `src/lessons/m4/HOMEWORK-exams.md`)
- **połącz** MobX store z widokami Reaktowymi
- implementację MobXową **popdepnij pod testy integracyjne**, które były pracą domową w Module 7 Testowanie Integracyjne (`src/lessons/m7/HOMEWORK.md`, *Proces Biznesowy: Exam*)
