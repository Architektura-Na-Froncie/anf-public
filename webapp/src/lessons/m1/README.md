# Moduł 1 - Type-Safety

## opis

W tym module uczymy się o bezpieczeństwie typów i o kompilatorze TypeScripta. "Aplikację" i warstwę UI będziemy budowali dopiero w następnych modułach.

## setup

- główny tsconfig projektu (`webapp/tsconfig.json`) ignoruje pliki z M1 (`exclude`). Aby sprawdzić poprawność typów, używamy IDE (pod spodem i tak używają TSa)
- Pliki z M1 są ignorowane, bo chcemy dogłębnie poznać reguły rządzące kompilacją TypeScripta. Niektóre pliki celowo zawierają błędy kompilacji - abyśmy mogli je przenalizować. Podobnie ignorowane będą niektóre pliki z następnych modułów (aby nie blokować kompilacji przyszłej aplikacji i storybooka)

## Pliki wg lekcji

- Podstawy Type safety
  - `intro-playground.tsx`
  - `intro.breaking-changes-3-5.ts`
- System typów TypeScripta
  - `struct.0.structural-vs-nominal.ts`
  - `struct.1.structural-polymorphism.ts`
  - `struct.2.polymorphism-toyaml.ts `
  - `annotation-vs-assertion.ts`
- Wnioskowanie typów
  - `inference.ts`
- Typy to zbiory
  - `types-are-sets.1.primitives.ts`
  - `types-are-sets.2.objects.ts`
  - `unions.1.ts`
  - `unions.2.exhaustiveness.ts`
  - `unions.3.exhaustiveness.HOMEWORK.ts`
  - `unions.4.functions-and-intersections.HOMEWORK.ts`
  - `compatibility.0.top-bottom.ts`
  - `compatibility.1.any.ts`
  - `compatibility.2.function-object.ts`
  - `compatibility.3.excessive.ts`
  - `compatibility.4.weak-types.ts`
  - `types-vs-interfaces.1.ts`
  - `types-vs-interfaces.2.performance.ts`
- Control Flow Analysis
  - `cfa.ts`
  - `cfa-dead-branch.ts`
  - `cfa.dla.powaznych.ts`
- Generyki i typy złożone
  - `types-generics.ts`
  - `types-mapped.ts`
  - `types-conditional.ts`
  - `types-conditional-mapped.ts`
  - `union-to-intersection.HOMEWORK.ts`
- Type-unsafe
  - `unsafe.0.array-access.ts`
  - `unsafe.1.index-signature.ts`
  - `unsafe.2.enum-number.ts`
  - `flags.1.no-implicit-any.ts`
  - `flags.2.no-implicit-return.ts`
  - `flags.3.strict-property-initialization.ts`
  - `flags.4.strict-null-checks.ts`
  - `flags.5.no-unchecked-index-access.ts`
  - `flags.6.strict-function-types.ts`
  - `flags.7.contravariant-array.ts`
  - `flags.8.contravariance.HOMEWORK.ts`
  - `flags.9.contravariance.HOMEWORK.ts`
  - `flags.10.contravariance.HOMEWORK.ts`
  - `invariance.HOMEWORK.ts`
  - `soundness.1.ts`
  - `soundness.2.ts`
- Wzorce i antywzorce
  - `patterns.single-source-of-truth.ts`
  - `patterns.opaque-brand.ts`
  - `patterns.value-objects.ts`
  - `patterns.anti.boolean-obsession.ts`
  - `patterns.http.ts`

## Zagadnienia TSowe w przyszłych modułach

- M1: 🤓
- M2: mocki, RTL, tslint
- M3: React, JSX, komponenty generyczne, HOCs, render props
- M4: Context API, custom hooks
- M5: Redux, reducers, selectors, root state
- M6: unie dyskryminacyjne, generyki, assert functions, state machines
- M7: RTL, page objects, composite page objects
- M8: rxjs, mobx stores
- M9: try..catch, error type guards
- M10: page objects
