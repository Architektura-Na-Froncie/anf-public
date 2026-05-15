// strictFunctionTypes odnosi się tylko do typów funkcyjnych ZA WYJĄTKIEM tych, które biorą się z deklaracji metod i konstruktorów
  // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-6.html
  // The stricter checking applies to all function types, except those originating in method or constructor declarations. Methods are excluded specifically to ensure generic classes and interfaces (such as Array<T>) continue to mostly relate covariantly.

// 🤨 a po polsku?
// ROBI RÓŻNICĘ, czy składniowo damy metody czy arrow functions
// arrow functions - podlegają strictFunctionTypes, zaś metody - NIE (dlaczego? bo w praktyce byłoby to niewygodne)

// eksperyment

// robimy kontrawariancyjnego arraya, opartego o arrowy.
interface ContraVariantArray<T> {
  push: (value: T) => number // contravariant, bo arrow
  // push(value: T): number // bivariant, bo metoda
}



// poniższa funkcja - ponieważ widzi że są albo stringi albo numbery, to zakłada, że operacje i na stringach i na numberach są bezpieczne
function messUpTheArray(arr: ContraVariantArray<string | number>): void {
  arr.push(3);
}

// poniżej są arraye tylko stringów i tylko numberów
// i nie możemy przekazać "jednorodnego" Arraya, ponieważ funkcja operuje na nim jakby był "nie-jednorodny"
// błąd powoduje parametr na pozycji kontrawariancyjnej
const strings: Array<string> = ['foo', 'bar'];
messUpTheArray(strings); // ❌ 'number' is not assignable to type 'string'
const numbers: Array<number> = [1, 2];
messUpTheArray(numbers); // ❌ 'string' is not assignable to type 'number'

// natomiast array "nie-jednorodny" śmiało może wejść do funkcji, bo i array i funkcja (w tym przypadku) operują na takich samych typach
const stringsOrNumbers: Array<string | number> = ['foo', 'bar'];
messUpTheArray(stringsOrNumbers); // ok



// wniosek?
// kontrawariancja chroni przed błędami - więc interfejsy na arrowach są bezpieczniejsze ALE mogą rzucać false positives.
