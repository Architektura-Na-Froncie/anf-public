const path = require('path');

/**
 * 🤔 jak mógłby wyglądać config aplikacji/testów, gdyby nie korzystać z gotowców typu CRA?
 * demonstracyjnie wycięliśmy storyshots z głównego setupu testowego - aby storyshots uruchamiany był osobną komendą.
 */

module.exports = {
  "roots": [
    "<rootDir>/storyshots",
  ],
  "setupFilesAfterEnv": [
    path.resolve(__dirname, "../../setupTests.ts"),
  ],
  "testEnvironment": "jest-environment-jsdom",
  "testMatch": [
    "**/__tests__/**/*.+(js)",
    "**/?(*.)+(spec|test).+(js)"
  ],
  "transform": {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": require.resolve("react-scripts/config/jest/babelTransform.js"),
    "^.+\\.css$": require.resolve("react-scripts/config/jest/cssTransform.js"),
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": require.resolve("react-scripts/config/jest/fileTransform.js"),
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
  ],
  "modulePaths": [
    path.resolve(__dirname, "../../"),
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
  ],
  "moduleNameMapper": {
    // https://github.com/remarkjs/react-markdown/issues/635
    "react-markdown": path.resolve(__dirname, "../../../node_modules/react-markdown/react-markdown.min.js"),
  },
}
