export class Stuff {
  constructor(
    private data: number[]
  ){}

  calculate(){
    return this.data.reduce((sum, n) => sum + n, 0)
  }
}
