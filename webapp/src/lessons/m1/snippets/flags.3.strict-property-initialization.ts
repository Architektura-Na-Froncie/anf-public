const getData = async () => 125

// ASYNC: dane najpierw trzeba pobrać, inicjalnie ich nie ma

class DataController {
  private data: number

  constructor(){}

  async initialize(){
    this.data = await getData()
  }
}

// skoro już wiemy, na czym _technicznie_ problem polega - gdzie jest problem w designie?
// i jakie jest poprawne rozwiązanie?

// 1. jak nie ma, to nie ma ( ͡° ͜ʖ ͡°)
// 2. !
// 3. async constructor
class AsyncController {
  private constructor(
    private data: number
  ){}

  static async create(){
    return new AsyncController(await getData())
  }
}

const instance1 = new AsyncController() // ❌ nope

(async () => {
  const instance2 = await AsyncController.create() // ✅
})()
