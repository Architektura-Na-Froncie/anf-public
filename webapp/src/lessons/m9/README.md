# Moduł 9 - Obsługa Błędów

## opis

W tym module uczymy się o Obsłudze Błedów na froncie. Omawiamy problematykę, type safety obsługi błędów, wznawianie żądań, implementacje na UI, logowanie komunikatów frontendowych oraz Inżynierię Chaosu.

## setup

Logger:
- uruchamiamy mockowe API (lokalizacja: `<repo>/api`, jakby co, mockowe API ma swoje szczegółowee readme: `api/README.md`)
- mockowe API jest dostępne: http://localhost:3000
- logger UI jest dostępne: http://localhost:3000/logger

## Pliki wg lekcji

- Cele i strategie obsługi błędów
- Obsługa błędów vs Type Safety
- Wznawianie żądań
  - `retryHTTP.ts`, `retryHTTP.spec.ts` - szkoleniowa implementacja wznawiania + testy
  - `api-retry/token.ts` - funkcje HTTP do pobierania tokenów z API - ale w wersji wznawiającej po failach
  - `api-retry/token.mock.ts` - mocki `msw`-owe które prowokują network request errory (aby móc testowa wznawianie)
  - `process-error-handling/AuthorizeDeviceWithErrorHandling.tsx`
- Obsługa błędów z perspektywy UI
  - `error-ui/*`
  - `process-error-handling/AuthorizeDeviceErrors.jest.spec.ts`
  - `process-error-handling/AuthorizeDeviceErrors.msw.spec.ts`
- Logowanie
  - `logger/*`
  - `process-error-handling/AuthorizeDeviceWithErrorHandling.tsx`
  - `webapp/.storybook/preview.js` - storybook logger (decorator, setup)
  - `process-error-handling/AuthorizeDeviceLogging.spec.ts`
- Chaos Engineering
  - `webapp/webpack-proxy/chaos.json` - webpack proxy
