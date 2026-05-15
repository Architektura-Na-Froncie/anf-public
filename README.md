# [Architektura Na Froncie](https://architekturanafroncie.pl)

```
                        ,--.           
   ,---,              ,--.'|    ,---,. 
  '  .' \         ,--,:  : |  ,'  .' | 
 /  ;    '.    ,`--.'`|  ' :,---.'   | 
:  :       \   |   :  :  | ||   |   .' 
:  |   /\   \  :   |   \ | ::   :  :   
|  :  ' ;.   : |   : '  '; |:   |  |-, 
|  |  ;/  \   \'   ' ;.    ;|   :  ;/| 
'  :  | \  \ ,'|   | | \   ||   |   .' 
|  |  '  '--'  '   : |  ; .''   :  '   
|  :  :        |   | '`--'  |   |  |   
|  | ,'        '   : |      |   :  \   
`--''          ;   |.'      |   | ,'   
               '---'        `----'     
```

## agenda

- Moduł 1: Type-Safety
- Moduł 2: Testowanie
- Moduł 3: React
- Moduł 4: Zarządzanie Stanem: Hooks & Contexts
- Moduł 5: Redux
- Moduł 6: Maszyny Stanowe
- Moduł 7: Testowanie Integracyjne
- Moduł 8: Programowanie Reaktywne
- Moduł 9: Obsługa Błędów
- Moduł 10: Testowanie End-to-end
- Moduł 11: Architektura Mikrofrontendowa

Dlaczego taka kolejność:

- szkolenie zaczynamy od TypeScripta (`m1`), aby wszystko, co zbudujemy później, było porządnie "otypowane". Nie dodajemy TypeScripta w środku, aby nie musieć "wracać do napisanego wcześniej kodu tylko po to, aby go otypować. Zamiast tego - pisząc nową rzecz, od razu ją typujemy i zamykamy temat.
- analogicznie, w `m2` podejmujemy temat testów, aby mieć niezbędną bazę, aby potem wszystko móc przetestować.
- dzięki temu elementy dodawane w `m3`, `m4`, `m5`, ... - będziemy mieli od razu otypowane i przetestowane automatycznie.

##  struktura repozytorium

- `api` - API RESTowe, w oparciu o które będziemy implementowali funkcjonalności
  - API jest jedynie ***zaślepką***, którą wykorzystujemy jedynie na potrzeby szkoleniowe; w żadnym razie kod API ***nie*** powinien być wykorzystywany produkcyjnie
  - **uruchamianie API** opisane jest w `api/README.md`
  - oparte o `json-server`
- `webapp` - właściwy kod szkoleniowy
  - kod każdego modułu ma dedykowany folder wewn. `webapp/src/lessons/*` (np. `webapp/src/lessons/m1`, `webapp/src/lessons/m2`, etc.)
  - aplikacja

### Zależności

Instalujemy uruchamiając w głównym katalogu repozytorium `npm install` (ewentualnie możesz ręcznie wywołać `npm install` wewnątrz folderów `api` oraz `webapp`).

Dodatkowo, po opublikowaniu każdego nowego modułu, należy uruchomić `npm install` ponownie, bo nasz setup będzie się rozrastał o nowe moduły.

## Setup

- używamy **node v16**+
- uruchamianie api mockowego:
  - w folderze `api`
  - uruchamiamy: `npm start`
  - mockowe API używa pliku `db.local.json` (ignorowanego przez gita; który jest kopią `db.json`). Plik ten jest automatycznie tworzony podczas wywołania `npm install` w folderze `api`
- uruchamianie aplikacji:
  - `npm start` (w folderze `webapp`, od Modułu 3 React)
  - plik `webapp/.env` jest elementem repozytorium (zmiany w treści pliku są śledzone przez gita). `REACT_APP_BASE_URL` jest bazowym URLem API (jest wykorzystywany przez funkcje do wysyłania żądań do API).
- uruchamianie storybooka:
  - `npm run storybook` (w folderze `webapp`, od Modułu 3 React)

Aplikacja oraz storybook zostaną dodane do setupu repozytorium w module "React".

## README oraz HOMEWORK

- każdy moduł szkoleniowy zawiera swój dedykowany plik ***README*** (`webapp/src/lessons/m1/README.md`, `webapp/src/lessons/m2/README.md`, etc.) w którym rozpisany jest setup, nowe komendy w `package.json`, tooling, a także dodatkowe info.
- każdy moduł szkoleniowy zawiera ***pracę domową*** wraz z opisem w pliku `HOMEWORK.md` (`webapp/src/lessons/m1/HOMEWORK.md`, `webapp/src/lessons/m2/HOMEWORK.md`, etc.)

## WAŻNE

- TL;DR; pamiętaj, że *kontekst szkolenia* jest **INNY** niż *kontekst prawdziwej aplikacji*, na której **ma zarabiać Twoja firma**.
- kod wewn. folderu `webapp` (aplikacja, storybook) ilustruje pewne rozwiązania i patterny. Zwróć uwagę, że nie każde rozwiązanie pasuje do danej aplikacji (w szczególności - do Twojej), dlatego nie powielaj patternów **bezrefleksyjnie**. W szczególności, że niektóre kawałki kodu będą ilustrowały **anty-patterny**
- W każdej aplikacji "trudne" (wymagające dopracowania) może być co innego, dlatego poziom szczegółowości w naszym szkoleniowym repo może być - zależności od tematu - bardziej szczegółowy, niż potrzebujesz - lub za mało szczegółowy, niż potrzebujesz. Przykładowo:
  - my podczas szkolenia będziemy bardzo dużo używali storybooka (znacznie więcej niż aplikacji) - ale dla "prawdziwego biznesu" to aplikacja jest kluczowa; a storybook może by miłym dodatkiem (a i nie każdy biznes "doceni" sttorybooka)
  - będziemy daną rzecz testowali z wielu stron (np. ręczne unit testy, snapshotowe unit testy, testy integracyjne, etc.) po to, aby przyjrzeć się, w jak wiele różnych sposobów można coś przetestować. Ale w prawdziwym projekcie NIE testujemy tej samej rzeczy 3 razy - wybralibyśmy 1 sposób

## jak czytać kod w tym repozytorium

- w kodzie jest sporo komentarzy, wyjaśniających mechanikę danego rozwiązania. W większych plikach, istotne komentarze są udekorowane emoji, aby było je łatwiej znaleźć, np:

```ts
// 🔥 odkomentuj:
// 🔥 excessive property check
// unnecessaryProperty: 125 // ❌ Object literal may only specify known properties bla bla
```
