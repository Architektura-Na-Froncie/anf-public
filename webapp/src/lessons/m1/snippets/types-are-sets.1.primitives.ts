export {}

declare let n: number
declare let s: string
declare let b: boolean

n = s
s = n
s = b
b = s
n = b
b = n
// nikt nie chce ze sobą współpracować
// ale prymitywy
// suchar zaliczony 😅



declare let prop: PropertyKey
prop = n
prop = s
n = prop
s = prop
