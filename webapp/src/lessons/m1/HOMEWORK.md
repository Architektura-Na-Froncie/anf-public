# Moduł 1 - Type-Safety - PRACA DOMOWA

## Nauka samodzielna - przykłady kodu TypeScript

- pliki: `src/lessons/m1/snippets/*.HOMEWORK.ts`
- prześledź przykłady kodu; sprawdź, czy rozumiesz dlaczego kompilator kod przepuszcza albo nie
- w szczególności, przeanalizuj `union-to-intersection.HOMEWORK.ts`

## Testy unitowe + typy

- folder: `src/lessons/m1/homework-tests`
- uruchomienie: `npm t` z folderu `webapp`
- inicjalnie testy są zaskipowane - należy je "odskipować". Brakuje im implementacji, więc wszystkie inicjalnie failują. 
- zadanie: Należy napisać implementację, zgodnie z poleceniami w każdym pliku - a przy okazji poćwiczyć typowanie w TypeScripcie.

## Mmodelowanie Domeny - System Ankiet (Ćwiczenie Designowe)

Zadanie:

- folder: `src/lessons/m1/homework-design`
- są 3 pliki PDF:
  - `survey-summary.pdf` - tak ma wyglądać podsumowanie wyników ankiet - **od tego pliku rozpocznij projektowanie**
  - `survey-individual.pdf` - tak ma wyglądać podgląd wypełnienia pojedynczej ankiety
  - `survey-questions.pdf` - tak ma wyglądać front dla osób wypełaniających ankiety
- przeanalizuj zawartość **makiet** pewnej planowanej **aplikacji do ankiet online**, które przygotował UX Designer
- **Twoje zadanie** - zaprojektować model danych oraz komponenty, które zostaną wykorzystane podczas implementacji aplikacji opartej o makiety:
  - **NICZEGO NIE IMPLEMENTUJ**, jedynie pisz interfejsy/typy/JSONy
  - zaprojektuj model danych (np. TS, JSON)
  - zaprojektuj komponenty (nazwa, typ propsów)
  - przemyśl, ile różnych komponentów trzeba będzie utworzyć, jak się będą komponowały, który z komponentów renderowałby poszczególne wysokopoziomowe widoki
  - spisz swój your w formie typów TS-owych, obiektów JSON lub pseudo-kodu - cokolwiek z czym będzie Ci wygodnie

Domena:

- każdą ankietę można wysłać do dowolnej liczby użytkowników; odpowiedzi są zapamiętywane przez system - i można je potem podejrzeć (zbiorczo lub indywidualnie)
- każda ankieta może składać się z sekwencji pytań 3 rodzajów:
  - pytanie **jednokrotnego wyboru** (single choice) - wybór spośród predefiniowanych opcji (np. radiobutton)
  - pytanie **wielokrotnego wyboru** (multi choice) - zaznaczanie TAK/NIE przy kolejnych opcjach do wyboru
  - pytanie **otwarte/esej** - odpowiedź słowna

Przykładowe pytania, na które warto znaleźć odpowiedź:

- w jakiej formie przychodzi z API definicja całej ankiety (zawierająca pytania)? Jak się ma do renderowania komponentów poszczególnych typów pytań?
- czy ten sam model (struktura/dane/typ) pytania będzie wykorzystywany w różnych widokach (individual, summary, questions)?
- kto wykonuje obliczenia (np. procent danej odpowiedzi z całości)
- i wiele, wiele innych...

Co należy stworzyć?

- przykładowy kierunek designu interfejsów z nagrania: https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgIIgM4HdrIN4BQBAvkaJLIigMqgDmANhAMIAWA9sEgIoCuEGMMHYh8BZBOQBHfoOEgAXMkFR64yQAd2GDMABGTdNmgYlRnFADaAXRJlw0eEmTVeUAG4QAnmLvlHVC5unl58AkIivqQEwAC2WlBgyABKEIhJMFDsscgA5FBpCGC5RAAmEAgMcAXICCKCQR7eSqnpAHQAYswAPK5NXgB8BOWV1Sh1mEl9IWFyIi2FYJ09096zESBDI1U1Ew20IIwsHFwQ6-IL7V299ExsnDyyG0NAA
- kod z linka nie rozwiązuje problemów zadanych w pracy domowej
- jedynie ilustruje, co mniej więcej należy dostarczyć jako _deliverable_ pracy domowej
