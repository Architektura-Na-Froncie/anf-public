## Proces biznesowy – Exam

- storybook: sekcja *Exams / Tasks*
- "na wejściu" mamy kilka komponentów:
  - wyświetlających pojedyncze zadanie: TextTaskView, RichtextTaskView, ChoiceTaskView
  - wyświetlających początek/koniec: WelcomeView, ExitView
  - folder: `src/ui/tasks/*`
- zadanie:
  - korzystając z ww. komponentów, zaimplementować proces biznesowy przejścia kandydata przez egzamin. Na początku jest WelcomeView, potem wyświetlane są poszczególne zadania, interfejs zbiera od kandydata odpowiedzi - i wysyła je do API. Na koniec wyświetla ExitView.
  - plik `src/ui/tasks/ExamView.tsx` obecnie zawiera zaślepkę która statycznie wyświetla jakieś jedno zadanie + sztywne buttony. Tutaj należy zaimplementować całość. W zależności od preferencji, można developować albo w storybooku (polecane), albo w webapp.

### Exam REST API

Zdefiniowane w naszym szkoleniowym API (`<repo>/api`, uruchamiane przez `npm start` z tamtego folderu).

#### zawartość egzaminu: `GET /exams/:examId` (np. `GET /exams/a`)

Na potrzeby pracy domowej, zostały przygotowane 2 egzaminy: [`a`](http://localhost:3000/exams/a) oraz [`b`](http://localhost:3000/exams/b). Pamiętaj żeby najpierw uruchomić szkoleniowe API :)
Definicje szkoleniowego API znajdują się w: `<repo>/api/middlewares/exams.js`.

Funkcja `getExam` z modułu `src/api/exams` pobiera dane z API (`HTTP GET /exams/:examId`).

Zwraca zawartość całego egzaminu (`tasks` zawiera uporządkowaną sekwencję pytań).
Kandydat będzie odpowiadał na pytania po kolei. W danym momencie egzaminu może widzieć co najwyżej 1 pytanie. Jak udzieli odpowiedzi na pytanie XMLDocument, wyświetlane jest pytanie X+1-sze.

```json
{
  "id": "a",
  "userId": "6ca8b2e6-67e3-464b-b688-6878ffc34c0e",
  "tasks": [
    {
      "id": "e853ac10-4a6a-4b29-8767-caa0462b64ef",
      "type": "TEXT",
      "question": "Are you living the life of your dreams?",
    }
    {
      "id": "41fe3dc3-c2da-4d5c-995d-0ab51f5148cc",
      "type": "CHOICE",
      "question": "Is it better to buy than to rent?",
      "choices": [
        { "id": "1", "label": "Yes" },
        { "id": "2", "label": "No" },
        { "id": "3", "label": "Maybe" },
        { "id": "4", "label": "Perhaps" },
        { "id": "5", "label": "And you?" },
      ],
    }
    {
      "id": "317b9c4e-77d0-4c6c-9fa5-31e1df7ea1f4",
      "type": "RICHTEXT",
      "question": "How worried are you about global warming?",
    },
  ]
}
```

Każde pytanie zawiera pole `type`, które pełni rolę enuma (`TEXT`, `RICHTEXT` lub `CHOICE`).
Array `tasks` zawiera sekwencję pytań, w dowolnej liczbie i kolejności.
Struktura poszczególnych rodzajów pytań:

- text task:

```json
{
  "id": "e853ac10-4a6a-4b29-8767-caa0462b64ef",
  "type": "TEXT",
  "question": "Are you living the life of your dreams?",
}
```

- richtext task:

```json
{
  "id": "317b9c4e-77d0-4c6c-9fa5-31e1df7ea1f4",
  "type": "RICHTEXT",
  "question": "How worried are you about global warming?",
},
```

- choice task:

```json
{
  "id": "41fe3dc3-c2da-4d5c-995d-0ab51f5148cc",
  "type": "CHOICE",
  "question": "Is it better to buy than to rent?",
  "choices": [
    { "id": "1", "label": "Yes" },
    { "id": "2", "label": "No" },
    { "id": "3", "label": "Maybe" },
    { "id": "4", "label": "Perhaps" },
    { "id": "5", "label": "And you?" },
  ],
}
```

#### odpowiedzi na pytania: `POST /exams/:examId` (np. `GET /exams/a`)

Wysyłanie odpowiedzi na _pojedyncze_ pytanie.
Na podst. URLa (np. `examId=a`) wiadomo, o który egzamin chodzi. Na podstawie pola `userId` wiadomo, o którego kandydata chodzi. A na podstawie `taskId` wiadomo, na które pytanie jest odpowiedź.

- text task answer:

```json
{
  "taskId": "e853ac10-4a6a-4b29-8767-caa0462b64ef",
  "userId": "6ca8b2e6-67e3-464b-b688-6878ffc34c0e",
  "answer": "Oh sure",
}
```

- richtext task answer:

```json
{
  "taskId": "317b9c4e-77d0-4c6c-9fa5-31e1df7ea1f4",
  "userId": "6ca8b2e6-67e3-464b-b688-6878ffc34c0e",
  "answer": "Oh sure",
}
```

- choice answer:

```json
{
  "taskId": "41fe3dc3-c2da-4d5c-995d-0ab51f5148cc",
  "userId": "6ca8b2e6-67e3-464b-b688-6878ffc34c0e",
  "answer": ["4", "5"],
}
```

### przykładowe wysłanie odpowiedzi

```js
fetch('http://localhost:3000/exams/a', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "taskId": "e853ac10-4a6a-4b29-8767-caa0462b64ef",
    "userId": "6ca8b2e6-67e3-464b-b688-6878ffc34c0e",
    "answer": "Oh sure",
  }),
})
```

### przykładowy flow

- `GET /exams/a` - pobranie zawartości egzaminu `a`
- UI wyświetla welcome view
- kandydat rozpoczyna egzamin
- UI wyświetla pytanie 1 (typu `TEXT`, treść już ma)
  - kandydat udziela odpowiedzi na pytanie `1` i klika "idź dalej"
  - `POST /exams/a`, `{ taskId: '1', userId: 'USER-ID', answer: 'odpowiedź' }` - wysłanie odpowiedzi kandydata na serwer
- UI wyświetla pytanie 2 (typu `CHOICE`, treść już ma)
  - kandydat udziela odpowiedzi na pytanie `2` i klika "idź dalej"
  - `POST /exams/a`, `{ taskId: '2', userId: 'USER-ID', answer: 'odpowiedź' }` - wysłanie odpowiedzi kandydata na serwer
- UI wyświetla pytanie 3 (typu `RICHTEXT`, treść już ma)
  - kandydat udziela odpowiedzi na pytanie `3` i klika "idź dalej"
  - `POST /exams/a`, `{ taskId: '3', userId: 'USER-ID', answer: 'odpowiedź' }` - wysłanie odpowiedzi kandydata na serwer
- UI wyświetla exit view
