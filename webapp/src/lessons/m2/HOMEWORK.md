# Moduł 2 - Testowanie - PRACA DOMOWA

## Projektowanie Testów - Paginacja (Ćwiczenie Designowe)

- zespół dostaje zadanie zaimplementowania paginacji od zera
- Ty dostajesz zadanie pokrycia go testami
- **zaprojektuj scenariusze testowe**, weryfikujące komponent paginacji (nie pisz testów - wystarczy sama lista scenariuszy)
- [przykładowy komponent paginacji](https://material-ui.com/components/pagination/)

## Refactoring Kata

- folder: `src/lessons/m2/homework-kata`
- "odskipuj" test
- uruchomienie: `npm t` z folderu `webapp`
- wykorzystujemy nasz setup `jest`
- treść zadania pochodzi z: https://github.com/emilybache/GildedRose-Refactoring-Kata/blob/master/TypeScript
- kopia treści zadania: `homework-kata/GildedRoseRequirements.txt`, a w skrócie:
  - odziedziczamy "kod kiepskiej jakości", który działa. Potrzebujemy - zgodnie z instrukcją - dodać nową funkcjonalność - i to jest naszym zadaniem
  - ale, przede wszystkim, nie możemy popsuć obecnych funkcjonalności. I w tym celu - pokrywamy testami regresyjnymi istniejące funkcjonalności. I gdy przyjdzie pora dodać nową funkcjonalność, której oczekuje biznes, to - w przypadku regresji - testy mają nam to wyłapać
  - rekomendowane: snapshot testy na JSONach :)

## Reguły Linterowe

- przejrzyj dostępne reguły (eslint, tslint, etc)
- wybierz 5, które są Twoim zdaniem kluczowe dla Twojego projektu
- wybór krótko uzasadnij na slacku

## Własny Projekt

- przeanalizuj testy w swoim projekcie pod kątem "**kryteriów wartościowych testów**". Czy możesz **zarekomendować usprawnienia**?
- jeśli testów w projekcie nie ma 😏 **zarekomenduj** elementy aplikacji (klasy, funkcje, komponenty, procesy biznesowe?) które najbardziej warto pokryć testami. **Uargumentuj**, dlaczego właśnie te elementy warto testować.
