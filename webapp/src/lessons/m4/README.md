# Moduł 4 - Zarządzanie Stanem

## opis

W tym module uczymy się o zarządzaniu stanem, zarówno o problematyce framework-agnostic, jak i rozwiązaniach specyficznych dla Reakta. Hooki, Contexty, `react-query` oraz testowanie.

## Pliki wg lekcji

- Tradeoffy, problematyka
- React Hooks
  - `hooks/react-stale-closure.stories.tsx` (SB)
- Context API
  - `context/context-ownContent.stories.tsx` (SB)
  - `context/context-noDefault.stories.tsx` (SB)
  - `context/context-separateDispatch.stories.tsx` (SB)
  - `context/context-connected-memoized.stories.tsx` (SB)
  - `context/context.stories.tsx` (SB, zbiorczy plik stories)
  - sample code: `context/DummyContext.ts`, `context/DummyComponents.tsx`, `context/utils.ts`
- Testowanie Context API
  - `context-tests/connected-components.spec.tsx`
  - `context-tests/parametrized-context.spec.tsx`
  - `context-tests/video-call-hooks.ts`
  - sample code: `context-tests/api.ts`, `context-tests/VideoService.ts`, `context-tests/VideoCallProvider.tsx`, `context-tests/mocked-hook.spec.tsx`
- Ładowanie danych z react-query
  - `react-query/EmployeesList.tsx`, `react-query/EmployeesView.tsx`
  - `react-query/ReactQuery.stories.tsx` (SB)
- Fasadowe hooki
