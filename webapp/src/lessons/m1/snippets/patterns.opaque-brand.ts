export {}

type Money = number & { readonly type: unique symbol }
declare let m: Money
declare let n: number

m = n // ❌ Type 'number' is not assignable to type 'Money'.
n = m // ✅
