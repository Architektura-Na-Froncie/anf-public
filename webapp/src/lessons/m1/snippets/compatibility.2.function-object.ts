export {}

// 1. Function

// wszystkie funkcje są kompatybilne z typem Function - kto by tego potrzebował?
var f1: Function = () => {}
var f2: Function = (n1: number) => {}
var f3: Function = (n1: number, n2: number) => {}
var f4: Function = (n1: number, n2: string) => true



// 2. Object


// Object == {}
// podmiana `Object` na `object` - non-primitive type
var o1: Object = 4
var o2 = {}
var o3: {} = 4

o1.valueOf()
o2.valueOf()
o3.valueOf()

o1 = o2 = o3
o2 = o1 = o3
o3 = o1 = o2

var n = 4
n = o1
n = o2
n = o3
o1 = n
o2 = n
o3 = n
