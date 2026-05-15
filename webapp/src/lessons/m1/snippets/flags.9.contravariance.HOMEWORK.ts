// załóżmy, ze mamy wielopostaciową funkcję, która ma formatować `value` na `label`
// poniżej są warianty, które powinniśmy wspierać:

type Info = {
  label: number
  value: number
  format: (value: number) => number
} | {
  label: string
  value: number
  format: (value: number) => string
} | {
  label: string
  value: string
  format: (value: string) => string
}

// montujemy funkcję calculate. Parametr wejściowy rozpakowujemy
// value jest unią inputów - prymitywów
// ale format jest unią funkcji
// typescript rozmontował je na unie z uwagi na składnię rozpakowania (destructuring)
//
// i problem w tym, że unia tych typów funkcyjnych oblicza się do:
// - OUTPUT: unia string|nummber (kowariancja) - standardowo, intuicyjnie
// - INPUT: never (kontrawariancja) - bo value string & number -> never
const calculate = ({ value, format }: Info) => format(value)
// unia na pozycji COvariant = unia
// unia na pozycji CONTRAvariant = przecięcie (odwrócenie)


// przeanalizujmy to na spokojnie - zróbmy aliasy i przyjrzyjmy im się dokładnie:
type Fn_number_to_number = (value: number) => number
type Fn_number_to_string = (value: number) => string
type Fn_string_to_string = (value: string) => string

// pierwszy + drugi (INPUT ten sam, number, OUTPUT - kowariancja, string|number)
declare const f1: Fn_number_to_number | Fn_number_to_string
f1() // f1: (value: number) => string | number

// drugi + trzeci (OUTPUT ten sam, string, INPUT - kontrawariancja - never)
declare const f2: Fn_number_to_string | Fn_string_to_string
f2() // f2: (value: never) => string



// HOMEWORK

// co można zrobić, żeby to przeszło?
// najprościej - z INFO zrobić dyskryminacyjną unię (obecnie nie jest dyskryminacyjna) - dodać np. `type`
// i potem w środku type guard. To będzie kod dłuższy, ale prosty jak budowa cepa
