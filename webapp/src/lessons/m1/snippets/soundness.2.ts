export {}

const numbers = [1,2,3,4,5] // number[]
const n = numbers[10] // number, 💀
// unsound
n.toFixed(0) // 🚨 FALSE NEGATIVE
