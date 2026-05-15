export {}

type Currency = "EUR" | "PLN"

class Money {
  private constructor(
    private value: number,
    private currency: Currency,
  ){}

  // prywatny konstruktor & statyczna metoda fabrykująca
  static from(value: number, currency: Currency){
    return new Money(value, currency)
  }

  // możemy mnożyć tylko przez współczynnik (liczbę)
  multiply(factor: number){
    return new Money(this.value * factor, this.currency)
  }

  // chronimy reguł biznesowych:
  // można dodawać tylko pieniądze w tej samej walucie
  add(another: Money){
    if (this.currency != another.currency){
      throw new Error('Cannot add different currencies')
    }
    return new Money(this.value + another.value, this.currency)
  }

  nominalValue(){
    return this.value
  }
}



const m = Money.from(99.99, "PLN") // deklaracja

m + 4 // ❌ Operator '+' cannot be applied to types 'Money' and 'number'.

const n: number = m // ❌ is not assignable to type 'number'

const sum1 = m.add( Money.from(1.23, 'PLN') ) // ✅ Money

const sum2 = m.add( Money.from(1.23, 'EUR') ) // ✅ kompiluje się (bo typy są zgodne)
// - ale wybuchnie w runtime

const product = m.multiply( 2 ) // ✅ Money
