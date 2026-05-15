# Moduł 7 - Testowanie Integracyjne - PRACA DOMOWA

## Testowanie Procesu Biznesowego

- wybierz proces biznesowy, który realizowaliśmy podczas szkolenia (np. **change limits**, **employee plans**)
- zaprojektuj scenariusze testowe, uwzględniające **wszystkie ścieżki**, przez które przechodzi użytkownik
- napisz testy integracyjne

## Proces Biznesowy: Exam

- implementacja procesu była pracą domową w module z Context API, teraz będziemy ją testować
- zaprojektuj scenariusze testowe i napisz testy integracyjne
- widoki obsługuj przy użyciu Page Objectów; a w szczególności - zaimplementuj Composite Page Object dla każdego rodzaju zadania (Text Task, Choice Task, etc.)

## Własny projekt

- przeanalizuj, w jaki sposób ustrukturyzowane są **mocki dla żądań HTTP** we wszystkich testach w projekcie. Czy są łatwe w utrzymaniu? Czy możesz zarekomendować usprawnienia?
- jeśli w projekcie istnieje **kluczowa funkcjonalność biznesowa**, która nie ma testów integracyjnych UI - zaprojektuj scenariusze - i zaimplementuj je.
- zrób (jako proof of concept) **setup mocków oparty o `msw`** i wepnij go w testy w swoim projekcie
