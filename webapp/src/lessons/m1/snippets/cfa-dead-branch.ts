export {}

interface ŁosośNorweski {
  smaczny: boolean
  krajPochodzenia: string
}

function dajMiŁosoś(){
  var musiByćŁosoś: ŁosośNorweski | undefined
  // if (!musiByćŁosoś){
  //   throw new Error('Wrong wrong wrong!')
  //   // IF branch implicitly continues with never
  // }
  // // ŁosośNorweski | never -> object
  return musiByćŁosoś // ŁosośNorweski
}

const mójŁosoś = dajMiŁosoś()

// ...a teraz odkomentujmy if-throw-error powyżej
// jak to wpływa na typ wynikowy?



// bonus:
// dlaczego explicit return type NIE ZAWSZE jest właściwy?
// powyższą funkcję ustawiamy na:
// function dajMiŁosoś(): object | undefined
// i NIE zauważyliśmy, że typescript zawęził typy - i tracimy te informacje
// type flow (flowtype :P) czasem jest bezpieczniejszym rozwiązaniem
