type Skills = string | string[] | null | undefined;

// distributive / rozłączne:
type NonNullableSkills = NonNullable<Skills>

// NonNullable: T extends null | undefined ? never : T

// string | string[] | null | undefined

// string extends null | undefined ? never : string
//        | string[] extends null | undefined ? never : string[]
//                   | null extends null | undefined ? never : null
//                          | undefined extends null | undefined ? never : undefined

// string
//        | string[]
//                   | never
//                          | never

// string | string[]




// 🔥 naked

// naked: T extends string
type OnlyStrings<T> = T extends string ? T : never
type OnlyStringsSkills = OnlyStrings<Skills>

// not-naked: T[] extends string[]
type _OnlyStrings<T> = T[] extends string[] ? T : never
type _OnlyStringsSkills = _OnlyStrings<Skills>



// 🔥 infer

// jak wydobyć typ parametru obiektu?
type Person = { name: string; age: number }
type PersonProperty = Person['name']

// a parametr z funkcji?
type PorytaFunkcja = (arg1: { value: number }, arg2: { date: Date }) => { value: number, date: Date }

type FirstArg<T> = T extends (arg: infer A, ...args: any[]) => any ? A : never
type FirstArgOfPorytaFunkcja = FirstArg<PorytaFunkcja>

// albo typ wynikowy funkcji?
// analogicznie - ale odpuszczamy pisanie ręczne, bo są wbudowane:
type T1 = Parameters<PorytaFunkcja>
type T2 = ReturnType<PorytaFunkcja>

// a dla funkcji (a nie typu funkcyjnego) trzeba dodatkowo typeof
const poryta = (arg1: { value: number }, arg2: { date: Date }) => ({ ...arg1, ...arg2 })
// type T3 = ReturnType<poryta> // ❌ namespace mismatch
type T3 = ReturnType<typeof poryta>
