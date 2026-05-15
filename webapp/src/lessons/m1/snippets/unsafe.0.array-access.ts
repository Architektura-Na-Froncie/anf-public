export {}

/**
 * dlaczego tak jest?
 * Kompilator mógłby wymusić na nas sprawdzanie opakowanie type guardem absolutnie każdej próby wejścia w element tablicy po indeksie. Tylko wyobraźmy sobie wówczas jak nasz kod spuchnąłby od olbrzymiej wręcz ilości IFów, sprawdzających czy aby wyrażenie nie jest undefined.
 * Tu jest pragmatyka TypeScripta - jeśli miałby bardziej przeszkodzić, niż pomóc, to nie wymusza. Nawet jeśli jest to kosztem niekonsekwencji. Podobne rozwiązanie ma zresztą Java, nazywa się unchecked exceptions (czyli wyjątki, które kompilator mógłby zbadać w compiletime ale z pragmatycznych powodów tego nie robi i jeśli miałyby wybuchnąc, wybuchają w runtime)
 */

// 1. elementA jest oczywiście numberem
const array = [1,2,3,4,5];
const elementA = array[0]

// 2. ale to nie powinno być
const elementB = array[5]
const elementC = array[10]
