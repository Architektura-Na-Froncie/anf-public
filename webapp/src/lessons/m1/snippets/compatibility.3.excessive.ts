export {}

interface Human {
  name: string
}

interface Developer extends Human {
  languages: string[]
}

// name i language jest kompatybilne
// jak odkomentujemy `address` - to też kompatybilne
const john = {
  name: "John",
  languages: ['js', 'ts'],
  // address: "Liverpool"
}

const dev: Developer = john

// ale jak podstawimy literał, to kaboom ❌
const anotherDev: Developer = {
  name: "John",
  languages: ['js', 'ts'],
  address: "Liverpool" // ❌ Object literal may only specify known properties, and 'address' does not exist in type 'Developer'
}
