# Moduł 7 - Testowanie Integracyjne

## opis

W tym module uczymy się o Testowaniu Integracyjnym. Omawiamy charakterystykę i cele testów integracyjnych, w opozycji do testów jednostkowych i E2E. Przyglądamy się mockowaniu Contextów, Reduxów - a także HTTP - jak mockować, jak testować - oraz jak HTTP obsłużyć w storybooku. Implementujemy page objecty oraz komponujemy je w większe całości.

## Pliki wg lekcji

- Testowanie zorientowane biznesowo
- Przykłady testów integracyjnych
  - `router/App.spec.tsx` (w kontekście routingu)
- HTTP: mockowanie, testowanie i storybook
  - `m6/authorize-device/AuthorizeDevice.stories.tsx` (SB) - authorize device, ale z uwzględnieniem mocków `msw`
  - `account-history/AccountHistory.spec.tsx`
- Mockowanie serwisów
  - `router/App.spec.tsx` (w kontekście `AppProviders`)
- Page Object Pattern
  - `authorize-device/*`
- Composite Page Object
  - `authorize-device/AddDeviceTokenView.po.tsx`
