# Moduł 5 - Redux - PRACA DOMOWA

Ważne: 2 zadania z pracy domowej bazują na "planach kadrowych" - ale **nie ma znaczenia kolejność** wykonywania zadań.

## Redux middleware (ćwiczenie designowe)

- zaprojektować Reduxowy custom middleware:
  `store => next => action => { …; return next(action); }`
- zaprojektować testy

wymagania:

- synchronizuje „slice” stanu z localStorage (read, write; tzn. zarówno "zapis" do reduxa powoduje aktualizację zapisu w localStorage, jak i uruchomienie aplikacji reduxowej rozpocznie od sprawdzenia, czy w localStorage może jakieś skeszowane dane już są)
- nie muszę synchronizować all-or-nothing – można wybrać kawałki stanu

## Plany kadrowe

- folder: `src/lessons/m5/employee-plans`
- storybook: sekcja *Lessons / Redux / Employee Plans*
- zadania: 
  - **dodajemy testy automatyczne**. Pokrywamy istniejącą funkcjonalność testami regresyjnymi.
  - **refactor**: przerabiamy tradycyjnego reduxa na implementację opartą o [redux toolkit](https://redux-toolkit.js.org)
  - **nowa funkcjonalność**: koszty pracownicze (miesięczne, kwartalne, roczne) mają uwzględniać zmiany wynikające z oglądanego planu kadrowego (box "Koszty pensji" i tam "Miesięczny/Kwartalny/Roczny koszt pensji" - wyświetlają kwotę, ale zamiast etykiety "bez zmian" obok, powinna być wyświetlana zmiana zgodnie z aktualnym planem kadrowym).
    - Np. jeśli na wejściu mamy dane: `Miesięczny koszt pensji / 98 317,00 € / BEZ ZMIAN`
      oraz w aktualnym planie kadrowym 5 pracowników dostało podwyżkę `+100 €`, to powinniśmy widzieć: `Miesięczny koszt pensji / 98 317,00 € / +500 €`
      a jeśli dodatkowo ma zostać zwolniony pracownik zarabiający 5000 €, to powinniśmy widzieć: `Miesięczny koszt pensji / 98 317,00 € / -4500 €` (zmiana: + 100 * 5 - 5000)
    - API
      - funkcja `getEmployees` z modułu `src/api/employees` pobiera dane z API (`HTTP GET <API>/employees`)

## Plany kadrowe – Collaborative UI

- folder: `src/lessons/m5/employee-plans`
  - w szczególności plik: `src/lessons/m5/employee-plans/store/collaborative.ts`
- storybook: sekcja *Lessons / Redux / Employee Plans*
- **kontekst**: wielu użytkowników pracuje w czasie rzeczywistym na tych samych danych. Jak user A kliknie "daj podwyżkę" obiektowi-pracownikowi X, to user B powinien zobaczyć ją u siebie po chwili. Jak user B kliknie "zwolnij" obiekt-pracownika Y, to user A powinien zobaczyć tę zmianę u siebie po chwili, itd.

- **zadanie**: umożliwić synchronizację zmian pomiędzy użytkownikami aplikacji w czasie rzeczywistym
  - **nie zapisujemy w API stanu** i nie pobieramy aktualizacji w pętli (np. po interwale); zamiast tego - eventy w czasie rzeczywistym
  - aplikacje klienckie łączą się z **serwerem WebSocket** (czyli NIE peer-to-peer)
  - zadanie **nie wymaga zmian** ani w API, ani w WebSocket server
  - logika aplikacji jest obsługiwana przez reduxa - **rozwiązanie zadania ma wykorzystać kod reduxowy** (tzn. rozwiązanie ma nie omijać reduxa np. poprzez stworzenie jakiegoś innego równoległego mechanizmu)
- **akcje użytkownika**:
  - **należy synchronizować**: daj podwyżkę, zwolnij, cofnij zmiany, tworzenie nowego planu
  - **NIE** należy synchronizować: ładowania kolekcji pracowników oraz wybierz plan (jeśli user A modyfikuje plan P1, zaś user B pracuje na planie P2, to wybór planu przez jednego użytkownika nie powinien wymuszać zmiany planu na innych użytkownikach aplikacji - byłoby to b. niepraktyczne)

### websocket

- serwer websocket jest dostępny pod adresem http://localhost:3578
- uruchamiamy go tą samą komendą, którą uruchamiamy API RESTowe - tyle, że dodajemy flagę `--coll` z linii poleceń. Czyli w folderze `api` uruchamiamy `npm start -- --coll`. Po uruchomieniu powinniśmy widzieć w logu konsoli poniższą linijkę: `CONFIG > COLLABORATIVE Service turned ON (port: 3578)`
- plik `src/lessons/m5/employee-plans/store/collaborative.ts` zawiera podstawowy kod tworzący klienta websocketa, wysyłanie wiadomości oraz ich otrzymywanie
- kod serwera websocketowego jest minimalistyczny, służy jedynie pracy domowej i w żadnym wypadku nie nadaje się do stosowania w aplikacji produkcyjnej :) dla zainteresowanych: `<REPO>/api/collaborative`
- **protokół websocketowy**:
  - zdarzenie, które obsługuje serwer (oraz które powinien wysyłać i odbierać klient) to `action`. Czyli `socket.on('action', ...)`, `socket.emit('action', ...)` itp.
  - wysłanie zdarzenia do websocketa przez klienta A powoduje *broadcast* (`socket.broadcast.emit`), tj. przekazanie tego zdarzenia do **wszystkich innych** klientów websocketa (wwszyscy poza klientem A).

### weryfikacja zadania

Uruchamiamy 2 instancje aplikacji (np. osobne karty przeglądarki), oglądamy je jednocześnie. Symulujemy zachowanie usera A w pierwszej karcie - i weryfikujemy czy te zmiany są widoczne u usera B. Analogicznie - symulujemy zmiany autorstwa usera B (2-ga zakładka) i weryfikujemy, czy widać je u usera A (1-sza zakładka)

UWAGA - kod stanowiący rozwiązanie powyższych będzie stosunkowo mały. Jest wiele rzeczy, które z założenia ignorujemy (patrz niżej: *uproszczenie zadania*).

### uproszczenie zadania

W zadaniu **ignorujemy** (nie implementujemy, nie rozwiązujemy etc.) m.in.:
  - sytuację, kiedy najpierw wchodzi 1-szy użytkownik, zdąży zmodyfikować dane (dispatchowane akcje), a potem przyjdzie 2-gi użytkownik, który operowałby na nieaktualnym stanie. Zakładamy, że użytkownicy uruchamiają aplikację w tym samym momencie i operują na tych samych danych z REST API. **Dla uproszczenia zadania.**
  - sytuację, w której wysyłane są równolegle konfliktujące ze sobą zmiany ("w tym samym momencie" np. user A daje podwyżkę, a user B zwalnia - obaj tego samego pracownika). Patrz *CRDT* poniżej.
  - sytuację, kiedy połączenie zostało zerwane i po wznowieniu połączenia trzeba się najpierw "zsynchronizować", bo coś się mogło zmienić w międzyczasie
  - sytuacji, kiedy awarii ulegnie serwer
  - ... i wiele innych zagadnień, nie uwzględnionych w *weryfikacji zadania*

**Ignorujemy te kwestie**, bo nie chcemy, aby praca domowa zajęła monstrualną ilość czasu; nie mamy na celu budowania gotowego produktu ;) jednocześnie zwracamy uwagę na to, że w "prawdziwym" projekcie trzeba by się tymi tematami zająć.

**Warto jednak przemyśleć** (tj. niekoniecznie kodować) w jaki sposób te zagadnienia należy zaadresować.

### CRDT (Conflict-free replicated data types)

Jest kilka problemów, których nie uwzględniamy w naszej pracy domowej. Najistotniejszym jest obsługa sytuacji, kiedy jednocześnie od różnych userów wchodzą zmiany na pewnej puli danych, które konfliktują ze sobą. Zainteresowanych odsyłam do [przykładowej implementacji rozwiązującej ów problem](https://github.com/yjs/yjs#Yjs-CRDT-Algorithm).

### podpowiedzi

- reduxowy event sourcing (gromadzenie eventów w formie serializowalnych obiektów) okaże się pomocny
- uwaga na pętle: jeśli user A wysyła zdarzenie i otrzymuje je user B, to user B nie powinien dalej broadcastować tego zdarzernia (w przeciwnym razie user A otrzyma je, niejako, ponownie)
- modyfikowanie / dodawanie nowych akcji, reducerów itp. nie jest potrzebne
