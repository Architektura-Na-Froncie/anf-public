export {}

// explicit any jest szkodliwe

var data: any

// wszystko można przypisać do any
data = 125
// any można przypisać wszędzie
function expectString(value: string){}
expectString(data)

// derivatives
var result = data.hello.ThisIsMe()[23456789].mnbgyuikmnbv['sdfgh'] // także any 🤷🏼‍♀️



// implicit any również jest szkodliwe

// parametry funkcji (prawie) nigdy nie są wnioskowane
// uff... 😅 no-implicit-any i tak rzuca błędem
const square = a => a * a
const aleLipa = ['architektura', 'na', 'froncie'].map(square)

// parametry funkcji są wnioskowane wskutek tzw. contextual typing
const juzNieLipa = ['architektura', 'na', 'froncie'].map(a => a * a)
// funkcja jest "osadzona" w kontekście callbacka, funkcja nie miała wcześniej przypisanego typu
