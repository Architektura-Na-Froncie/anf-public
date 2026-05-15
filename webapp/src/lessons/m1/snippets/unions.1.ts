export { }

// SUMY ZBIORÓW

{
  type A = { type: "A" }
  type B = { type: "B" }
  type C = { type: "C" }
  type Union = A | B | C
  type PropType = Union['type'] // "A" | "B" | "C"
}

{
  // niech choćby jedno będzie nadtypem (nadzbiorem) pozostałych - to "połknie" pozostałe
  // pamiętamy: string | "ABC" = string
  type A = { type: string }
  type B = { type: "B" }
  type C = { type: "C" }
  type Union = A | B | C
  type PropType = Union['type'] // string
}