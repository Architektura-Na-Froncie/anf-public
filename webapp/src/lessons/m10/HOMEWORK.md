# Moduł 10 - Testy End-to-End - PRACA DOMOWA

## Testy End-to-End

- wybierz proces biznesowy (change limits, exam, employee plans, etc.)
- napisz testy End-to-End uwzględniające happy path oraz sad path. W przypadku sad path - użyj np. cypress HTTP/interceptor.

## Authorize Device - po zalogowaniu

Dostosowujemy proces *authorize device* tak, jak on docelowo powinien działać :) tzn. kiedy użytkownik chce wejść w apkę, to najpierw jest tradycyjne logowanie (login + hasło), w następnym kroku jest autoryzacja urządzenia - i jeśli to się uda, to dopiero potem użytkownik ma dostęp do aplikacji (wcześniej nasza implementacja *authorize device* była "niepowiązana" z tradycyjnym formularzem logowania).

Jeśli logowanie się nie uda (np. błędne hasło) - nie przechodzimy dalej. Jeśli logowanie się udało, a autoryzacja urządzenia się nie powiodła - to albo użytkownik nadal jest w procesie autoryzacji urządzenia (próbuje ponownie, lub zmienił metodę autoryzacji), zaś jeśli kliknął "wyloguj" - no to został wylogowany :) i nie ma dostępu do aplikacji. Dopiero jeśli udało się zautoryzować urządzenie, użytkownik uzyskuje dostęp do apki. To uwzględnia również wchodzenie przez routing (próba ominięcia logowania), np. poprzez "wpisanie z palca" URLa, na którym się znajduje konkretna podstrona.

### API - logowanie

- API obsługuje "wbudowane" konto `admin`/`admin` ( ͡° ͜ʖ ͡°)
- jest też możliwość zdefiniowania innych kont/dostępów w pliku `api/middlewares/auth/credentials.json` (modyfikacja pliku + potem restart)
- domyślnie API jest uruchamiane z parametrem `auth=false`, czyli autentykacja **nie jest wymagana**. W konsoli widzimy: `CONFIG > JWT Authorization OFF`. Natomiast jak chcemy włączyć **wymaganą** autentykację, to przekazujemy false, np: `npm start -- --auth=true` (lub `npm start -- --auth`) i w konsoli będzie `CONFIG > JWT Authorization ON`. W razie potrzeby, mini-specyfikacja API znajduje się w pliku `api/README.md`.
- zasoby REST:
  - POST <API>/auth/login, parametry `username`, `password`.
  - POST <API>/auth/logout
  - dla ciekawych - mini-implementacja logowania w API znajduje się w `api/middlewares/auth/login.js`.
  - funkcje obsługujące API po stronie klienta znajdują się w `src/api/auth.ts`.

### Testy End-to-End

Kiedy już połączysz logowanie z procesem autoryzacji urządzenia, napisz testy End-to-End, które zweryfikują rozmaite przypadki.

## Własny Projekt

- przygotuj setup cypress + napisz testy, które pokryją krytyczny biznesowo scenariusz (jako proof of concept)
- zaplanuj, w jaki sposób testował(a)byś automatycznie accessibility. Napisz pierwsze testy a11y do projektu
