# Single-SPA

## Instalacja zależności

Wyjątkowo na potrzeby tego projektu do instalowania zależności korzystamy z **`yarn`**, ze względu na wykorzystanie yarn workspaces. Komenda:
- `yarn`

## Uruchomienie

Osobno stawiamy każdy z elementów:

- `root-config` (shell app) - port 9000
- `departments` - port 9001
- `header` - port 9002
- `employees` - port 9003

Albo **dla uproszczenia**, w folderze parenta (workspace root, czyli *tutaj*) mamy:

- `npm start` - które uruchamia `wsrun`, czyli równolegle odpala wszystkie npm start w każdym workspace package

### włączenie devtoolsów dla `import map override`:

```ts
localStorage.setItem("devtools", true);
```

albo odkomentować linijkę w `root-config/src/index.ejs`: `<import-map-overrides-full dev-libs></import-map-overrides-full> -->`

## API

dodatkowo uruchamiamy szkoleniowe REST API:

- `cd <REPO>/api; npm start`
