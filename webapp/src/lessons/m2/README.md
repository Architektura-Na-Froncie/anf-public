# Moduł 2 - Testowanie

## opis

W tym module uczymy się o testowaniu w JSie. Poznajemy rodzaje testów, asercje, techniki mockowania, "dobre i złe" praktyki. Korzystając z tej wiedzy, będziemy montowali mnóstwo testów w przyszłych modułach.

## setup

- `npm t` - uruchom testy `jest` (standardowa komenda do testów) z folderu `webapp`. Uruchomi się `jest` który będzie szukał plików `*.(spec|test).(js|jsx|ts|tsx)`
  - zalecane skorzystanie z CLI:
    - `w` - `show more` (menu wyboru)
    - `t` - `filter by a test name regex pattern`
    - `p` - `filter by a filename regex pattern`
    - `c` - `clear filters`
  - niektóre testy celowo są za-skip-owane, ponieważ inicjalnie failują. Są to m.in. testy, które są tzw. FALSE-FAIL, albo które po prostu demonstrują komunikat błędu testu, ktory nie przechodzi. Takie testy możemy od-skipować, przeanalizować output - i z powrotem za-skip-ować, aby na przyszłość output był "na zielono"
  ❗️ Żeby nie było wątpliwości :) utrzymywanie testów za-skip-owanych w projekcie jest kontrproduktywne i niezalecane❗️
- `npm run test:unit` - jw. ale z flagą `CI=true` (non-watch mode)
- `npm run check:circular-deps` (`madge`) - circular dependencies check; jeśli mamy cykle w zależnościach - komenda failuje + wypisuje cykle. Wpinamy ją poprzez husky'ego w nasz workflow.
- `npm run dump:deps` - zrzuca strukturę zależności modułów do pliku json (jako płaski słownik, tj. NIE zagnieżdżone drzewo). Jeśli jakiś moduł trafia do bundle'a i *nie wiemy dlaczego*, to dzięki `madge` zobaczymy, kto kogo importuje

🔥 Niektóre testy omawiane w module (M2) celowo failują lub są zaskipowane. Najczęściej chodzi o to, że przyglądamy się, jakie w danej sytuacji lecą komunikaty błędów, lub jakie błędy programista może popełnić (nieświadomie). Szczegóły są omówione w nagraniach video lub poszczególnych plikach.

## tips

- jeśli używasz VSCode, wypróbuj [dedykowany plugin dla `jest`](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)

### dodatkowy setup mocha/jasmine/jest

W 3 folderach dostępne są przykładowe setupy najpopularniejszych frameworków testowych pod TypeScripta: `mocha`, `jasmine` i `jest`. W każdym dostępne są skrypty:

    npm i # npm install
    npm t # npm test
    npm run test:watch # watch mode
    npm run test:coverage # code coverage

zawierające 1 samplowy test. Code coverage pokrywa metodę `add`, zaś `sub` pozostaje niepokryta.

## Pliki wg lekcji

- Cele testowania i systematyka
- Kryteria wartościowych testów
  - `false-pass.spec.tsx`
- Asercje
  - `jest-rtl-assertions.spec.tsx`
- Mockowanie
  - `http-jest-spyOn.spec.ts`
  - `jest-mock.spec.ts`
  - `jest-mock-factory.spec.ts`
  - `jest-mock-require-actual.spec.ts`
  - `jest-mock-class.spec.ts`, `stuff.ts`
  - `jest-mock-hook.spec.tsx`, `stuff-context.ts`
  - `jest-mock-component.spec.tsx`, `jest-mock-component-editor.tsx`
  - HTTP
    - sample code: `Album.ts`, `AlbumDAO.ts`, `AlbumRepository.ts`
    - `jest-mock-return-value-once.spec.ts`
    - `http-fetch-mock.spec.ts`
    - `http-msw.spec.ts`
- Dane Testowe
  - `jest-data-type-safety.spec.ts`
  - `data-dont-care-dont-specify.spec.ts`
- Rodzaje testów
  - `jest-async.spec.ts`
  - `jest-async-timers.spec.ts`
  - `jest-async-flush-promises.spec.ts`
  - `editor.spec.tsx`, `Editor.tsx`
  - `data-utils.spec.ts`, `data-utils.ts`, dane: `data-logs.json`, `data-logs.ts`
  - `assert-object.ts`
- Testowanie statyczne
  - `cycle/*` - cykliczne zależności (`madge`)
- ESLint
  - `lint/lint-no-shadow.tsx`
  - `lint/lint-prefer-const.tsx`
  - `lint/lint-no-implicit-any-catch.ts`
  - `lint/lint-no-unnecessary-type-assertion.ts`
  - `lint/lint-no-unsafe-return.ts`
  - `lint/lint-no-unsafe-call.ts`
- Code Coverage
  - `setup/jest/src/coverage.js` (uruchamiane poleceniem `npm run test:coverage` z folderu `webapp/src/lessons/m2/setup/jest`)
