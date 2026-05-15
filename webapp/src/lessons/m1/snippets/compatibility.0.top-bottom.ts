export {}

// 1. intro + any

let n: number = 1
let s: string = 'label'
let p = { name: 'John' }

let a: any

a = n // assigning __ to __
n = a // assigning __ to __

a = s // assigning __ to __
s = a // assigning __ to __

a = p // assigning __ to __
p = a // assigning __ to __

// 2. a teraz unknown

let u: unknown

u = n // assigning __ to __
n = u // assigning __ to __

u = s // assigning __ to __
s = u // assigning __ to __

u = p // assigning __ to __
p = u // assigning __ to __

// 3. jak sprawić, aby to się kompilowało?
// zastosować type guards

n = u
s = u
p = u
