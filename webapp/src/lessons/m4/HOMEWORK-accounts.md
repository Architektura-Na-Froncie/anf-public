## Data Listing – Accounts

- storybook: sekcja *Account / Transfers*
- folder: `src/ui/transfers/*`
- API
  - funkcja `getTransfers` z modułu `src/api/transfers` pobiera dane z API (`HTTP GET <API>/account/transfers`)
- zadanie: zaimplementować komponenty tak, aby zarządzanie zewnętrznymi danymi było obsługiwane przez `react-query`
- rozbudowa (filtry i paginacja): oprócz dostosowania implementacji react-query, potrzebne będzie również dostosowanie funkcji pobierającej dane z API:
  - pobranie pierwszej strony: http://localhost:3000/account/transfers
  - pobranie pierwszej strony: http://localhost:3000/account/transfers?_page=1
  - pobranie drugiej strony: http://localhost:3000/account/transfers?_page=2
  - filtrowanie: http://localhost:3000/account/transfers?title_like=metal
  - więcej w dokumentacji paczki [`json-server`](https://github.com/typicode/json-server#table-of-contents)
