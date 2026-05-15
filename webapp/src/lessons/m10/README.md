# Moduł 10 - Testy End-to-end

## opis

W tym module uczymy się o Testach End-to-End. Omawiamy problematykę, przyglądamy się technicznym detalom cypressa oraz puppeteera, a także implementujemy w nich testy. Następnie przechodzimy do Testowania Dostępności oraz Visual Regression Testing.

## setup

- cypress:
  - `npm run test:cypress:run` - uruchom testy w cypress (headless mode)
  - `npm run test:cypress:open` - uruchom testy w cypress (GUI mode)
  - `npm run test:cypress:clean` - wyczyść pliki cypressa
- puppeteer:
  - `npm run test:puppeteer:run` - uruchom testy w puppeteerze
  - `npm run test:puppeteer:clean` - wyczyść pliki puppeteera
  - `npm run test:puppeteer:a11y` - uruchom testy a11y w puppeteerze
  - `npm run generate:lighthouse-report` - wygeneruj raport lighthouse
- backstop:
  - `npm run test:backstop:test` - uruchom testy w backstop
  - `npm run test:backstop:approve` - zatwierdź snapshoty (tak jak update snapshot w `jest`)
  - `npm run test:backstop:clean` - wyczyść pliki backstopa
- storyshots:
  - `npm run test:storyshots:test` - uruchom storyshots

🔥 Testy a11y (cypress, puppeteer) celowo failują - aby można było szybko i wygodnie zobaczyć komunikaty i szczegóły błędów.

🔥 Snapshoty zostały wygenerowane pod systemem MacOS, przez co testy mogą failować pod innymi systemami operacyjnymi (Windows, Linux), ze względu na różnice w renderowaniu fontów.

## Pliki wg lekcji

- Cele, korzyści i koszty testów End-to-End
- Testowanie aplikacji End-to-End (Cypress oraz Puppeteer)
  - `cypress/*` - cypress sam instaluje strukturę folderów
    - `integration/*` - testy, pomimo nazwy, z reguły E2E 😅
    - `screenshots/*`, `snapshots/*`, `videos/*` - jak sama nazwa wskazuje
    - `plugins/*`, `utils/*` - jak sama nazwa wskazuje
  - `cypress.json` - config, do którego odwołują się npm scripts, np. `cypress run --project ./src/lessons/m10`
  - `puppeteer/*` - testy puppeteerowe
  - `puppeteer.jest.config.js` - config, do którego odwołują się npm scripts, np. `jest --config ./src/lessons/m10/puppeteer.jest.config.js`
  - `storybook-integration-testing.stories.tsx` (SB) testowanie integracyjne cypress/storybook
- Page Object i jego ograniczenia
- Testowanie accessibility
  - `a11y.test.tsx`
  - `storybook-a11y.stories.tsx` (SB)
- Testowanie wizualne
  - `vrt/*` - przykład ilustrujący failujący snapshot w wykonaniu pixelmatch oraz resemble/backstop
  - backstop
    - `backstop.json` - config, do którego odwołują się npm scripts, np. `backstop test --config src/lessons/m10/backstop.json`
    - `backstop_data/*` - setup backstopa (rysunki referencyjne, rysunki z testów, skrypty, raporty)
    - `backstop_example/*` - przykładowe snapshoty testów + raport backstop
  - storyshots
    - `storyshots.jest.config.js` - config, do którego odwołują się npm scripts, np. `jest --config ./src/lessons/m10/storyshots.jest.config.js`

## tooling

### puppeteer e2e testing

- [docs](https://pptr.dev/)
- [przykłady - oficjalne repo](https://github.com/GoogleChrome/puppeteer/tree/master/examples/)
- `jest-puppeteer` - avoid manually manipulating browser & page
- `jest-dev-server` - open application locally before e2e tests are run
- praktycznie wszystko musi być `await`owane w testach puppeteerowych
- **`slowMo`** - spowolnienie działania testu - jeśli chcemy podejrzeć co się dzieje w teście, tak żeby ludzkie oko nadążyło za tym, co się dzieje

### visual testing

- przegląd narzędzi: https://github.com/mojoaxel/awesome-regression-testing
- `jest-image-snapshot` / [pixelmatch](https://github.com/mapbox/pixelmatch)
- `backstopjs` / [resemble](https://rsmbl.github.io/Resemble.js/)

### accessibility testing

- disclaimer:
  > Please note that only 20% to 50% of all accessibility issues can automatically be detected. 
  > Manual testing is always required. For more information see:
  > https://dequeuniversity.com/curriculum/courses/testingmethods
- axe
  - [po co?](https://github.com/dequelabs/react-axe#advantages)
  - [reguły a11y](https://dequeuniversity.com/rules/axe/4.1/)
  - uruchom jako:
    - [chrome extension](https://chrome.google.com/webstore/detail/axe-web-accessibility-tes/lhdoppojpmngadmnindnejefpokejbdd)
    - CLI np: `npx axe-cli https://onet.pl`, `npx axe-cli https://interia.pl`, `npx axe-cli <URL>`,, ...,  > `137 Accessibility issues detected.`
