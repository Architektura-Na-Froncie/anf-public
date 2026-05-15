export {}

// zaawansowany przykład - warunkowe & mapowane

// poniższa konstrukcja pozwala nam "odfiltrować" pola wg warunku
// (ale nie arbitralnie tak jak Pick/Omit, tylko wg typu warunkowego)

type WithoutNullProperties<T> = Pick<T, {
  [P in keyof T]: null extends T[P] ? never : P
}[keyof T]>

type Order = {
  price: number;
  deliveryDate: Date | undefined;
  shipment: string | null;
};

type OrderWithoutNullProperties = WithoutNullProperties<Order>


/// analiza


// mapujemy typ: nulle zamieniamy albo na NAZWĘ pola (!) albo na never
type NullableAsNever = {
  [P in keyof Order]: null extends Order[P] ? never : P
}

type lukap = keyof Order

// i indeksujemy po kluczach obiektu
type PropertiesWithoutNull = {
  [P in keyof Order]: null extends Order[P] ? never : P
}[keyof Order]

// działa to tak:

// { price: "price"; deliveryDate: "deliveryDate"; shipment: never; } ["price" | "deliveryDate" | "shipment"]
//
// unia jest "distributive" (rozłączna):
// { price: "price"; deliveryDate: "deliveryDate"; shipment: never; } ["price"]
//   SUMA
//   { price: "price"; deliveryDate: "deliveryDate"; shipment: never; } ["deliveryDate"]
//   SUMA
//   { price: "price"; deliveryDate: "deliveryDate"; shipment: never; } ["shipment"]
//
// a to daje NAZWY pól spełniających warunek:
// "price"
//   SUMA
//   "deliveryDate"
//   SUMA
//   never
//
// czyli:
// "price" | "deliveryDate"

// dodajemy Pick, aby zmontować z powrotem typ obiektowy:
type OrderWithoutNullProps = Pick<Order, {
  [P in keyof Order]: null extends Order[P] ? never : P
}[keyof Order]>
// i to już jest to, co chcemy

// teraz już tylko abstrahujemy typ generyczny: Order -> T






// a gdybyśmy chcieli wyłączyć i nulla i undefined, to:
//  [P in keyof T]: null | undefined extends T[P] ? never : P
// nie zadziała, bo dane pole musiałoby mieć całą unię w sobie (null | undefined)
// czyli (null | undefined) musiałaby być _podzbiorem_ danego pola

// potrzebujemy zatem OSOBNO "odsiać" nulla, a osobno undefined:
//  [P in keyof T]: null extends T[P] ? never : undefined extends T[P] ? never : P
// w tym konkretnym przypadku chcemy: dla null -> never, dla undefined -> never, w przeciwnym razie P
// składnia TSa może i d. nie urywa, ale można dużo na niej zbudować
