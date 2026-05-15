# Moduł 3 - React

## opis

W tym module uczymy się o Reakcie jako warstwie UI aplikacji frontendowych. Bezpieczeństwo typów w kontekście building blocków Reakta, setup aplikacji, design komponentów, obsługa CSS, deep dive zagadnień rendering i performance, oraz testowanie.

## setup

❗️ W tym module wchodzi apka reaktowa oraz storybook ❗️

Wszystkie komendy uruchamiane z folderu `webapp`.

- CRA/`create-react-app` - pełna automatyzacja budowania, testowania i developmentu apek reaktowych
  - `npm start` - (standardowa komenda) otwórz aplikację w trybie *development*
  - `npm run build` - (standardowa komenda) zbuduj produkcyjną wersję aplikacji
- `webpack-bundle-analyzer` - automatycznie uruchamiane przy `start` oraz `build`
  - `webapp/config-overrides.js`
- storybook
  - `npm run storybook` - otwórz storybooka w trybie *development*
  - `npm run build-storybook` - zbuduj produkcyjną wersję storybooka (pliki gotowe pod deploya/hosting, np. żeby Biznes sobie oglądał na bieżąco jak marchew rośnie 🙃)

## Pliki wg lekcji

- React & TypeScript
  - `typescript/compile-fail/react-types.tsx`
  - `typescript/compile-fail/FunctionComponents.tsx`
  - `typescript/HOCWithLoading.tsx`
  - `typescript/RenderProp.tsx`
  - `typescript/UnionProps.tsx`
  - `typescript/react-typescript.stories.tsx` (SB)
  - `typescript/react-strict.tsx`
  - `typescript/compile-fail/react-contravariance-and-type-assertions.tsx`
  - `.vscode/snippets/typescriptreact.json` (VSCode snippets)
- CRA & App Setup
  - `webapp/config-overrides.js`
  - `webapp/.huskyrc.json`
- Storybook & Component-driven UIs
  - `storybook-styling.stories.tsx`
- React & CSS
  - `css/react-css.css`, `css/react-css.module.css`, `css/react-css.stories.tsx` (SB)
  - `ui/molecules/Modal/Modal.tsx`, `ui/molecules/Modal/Modal.module.css`, `ui/molecules/Modal/Modal.stories.tsx`
  - `css/styled-components-snapshot.spec.tsx`
  - `ui/atoms/Button.tsx`, `ui/atoms/Button.stories.tsx`
- Rendering & performance
  - `performance/react-memo-children.stories.tsx` (SB)
  - `performance/react-usememo.stories.tsx` (SB)
  - `performance/react-performance.stories.tsx` (SB, zbiorczy plik stories)
  - `rendering/react-refs-lost-update.stories.tsx` (SB)
  - `rendering/react-keys-unmount.stories.tsx` (SB)
  - `rendering/react-keys-index.stories.tsx` (SB), `rendering/short-id.js`
  - `rendering/react-rendering.stories.tsx` (SB, zbiorczy plik stories)
  - `rendering/GoogleTranslate.tsx`, `rendering/GoogleTranslate.stories.tsx` (SB)
  - zbiorczy plik stories redukuje warningi dot. deprecated API storybooka w związku z ewentualnym upgradem storybooka z v6 na v7 (powiązane z błędami storybooka dotyczącymi hot reload komponentów podczas developmentu - rozwiązanie błędu wymaga innego ustrukturyzowania kodu w plikacch stories; stary sposób organizowania czyli wiele plików wrzucających stories do jednego "folderu" storybookowego w v6 rzuca warningi)
- React testing
  - `first-test.spec.tsx`

## design systems

- https://github.com/alexpate/awesome-design-systems
