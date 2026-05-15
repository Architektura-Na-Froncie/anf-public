module.exports = {
  "ignorePatterns": [
    "*.spec.tsx", "*.spec.ts", "**/stories/**", // nie lintujemy testów ani stories - nie warto
    "**/lessons/m1/**", // nie lintujemy modułu Type-Safety, bo nie chcemy mieszać błędów kompilatora i lintera
    "**/setup/**", // nie lintujemy zewnętrznych setupów (jasmine, mocha, puppeteer, cypress etc.)
  ],
  "extends": [
    "react-app",
    "react-app/jest",
    "plugin:jsx-a11y/recommended"
  ],
  "rules": {
    "no-shadow": "error",
    "prefer-const": "warn",
    "no-console": "warn",
    "@typescript-eslint/prefer-readonly": "off",
    "@typescript-eslint/no-implicit-any-catch": "warn",
    "@typescript-eslint/no-unsafe-call": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/no-unnecessary-type-assertion": "warn",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-unused-expressions": "off"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json",
    "tsconfigRootDir": __dirname,
  }
}
