# Moduł 3 - React - PRACA DOMOWA

## Testy Reactowe + Komponenty Funkcyjne

- folder: `lessons/m3/homework/contacts`
- uruchomienie: `npm t` z folderu `webapp`
- zadanie bezpośrednie: przepisać komponenty klasowe na funkcyjne
- zadanie pośrednie: "wyprostować" testy
  - przyjrzyj się, jak zmontowane są asercje. Jak się będzie z nimi pracowało? Co można poprawić?
  - w jaki sposób setupowane/przygotowywane są scenariusze testowe? Jakie będą konsekwencje, jeśli zechcemy coś zmienić w implementacji?

### Testy Reaktowe

- Programiści pracujący nad tym kodem narzekają, że utrzymywanie go jest męczące.
- Kiedykolwiek zmieniają coś w komponentach, jakieś testy się sypią. I jak się sypią, to nie wiadomo, o co chodzi - i trzeba analizować test krok po kroku.
- Dodatkowo, planowany jest refactor komponentów klasowych na hooki. I wg architekta, najpierw trzeba zaktualizować testy, żeby ten refactor w ogóle był możliwy.
- **zadanie**: wspomóż swój zespół, aby usprawnić testowanie - niech stanie się efektywne, a testy nie łamią się tak często.
  - przeanalizuj asercje i popraw je pod kątem takim, aby komunikaty błędów były w miarę możliwości precyzyjne
  - zrefaktoruj komponenty klasowe na funkcyjne - i zaktualizuj pod tym kątem testy
  - na koniec, wszystkie testy mają przechodzić.
- **review**: kiedy już usprawnisz testy - jakie wskazówki na przyszłość, związane z testowaniem, przekażesz zespołowi?

## Optymalizacje

- folder: `lessons/m3/homework/optimize`
- uruchomienie SB: `npm run storybook` z folderu `webapp`; w SB sekcja: M3 React / Homework / Employee Plans
- zadanie:
  - uruchom devtoolsy, przeklikaj funkcjonalność - a także przeczytaj kodzik
  - znajdź miejsca, w których obliczenia są wykonywane nadmiarowo i zastosuj optymalizacje 

## Własny Projekt - Storybook

- jeśli nie używacie w projekcie storybooka, stwórz **proof of concept** - dla kilku wybranych komponentów
- zaproponuj, jak pogrupować komponenty w skali całego projektu
