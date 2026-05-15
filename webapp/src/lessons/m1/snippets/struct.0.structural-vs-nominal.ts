export {} // 

/*
Zerknijmy na przykład: mamy 3 różne elementy: interfejs, klasę i typ TypeScriptowy. Nie dziedziczą po żadnej klasie, nie implementują żadnego interfejsu.

Krótka dygresja dotycząca słowa kluczowego declare.
Słowem kluczowym declare w TypeScripcie mówimy kompilatorowi, że pewna zmienna istnieje już w pamięci (node.js lub przeglądarce), tzn. Słowa declare używa się albo tak jak my tutaj aby laboratoryjnie zbadać kompatybilność dwóch bytów - albo w projekcie jeśli mamy do czynienia ze starą architekturą webową, gdzie pliki JSowe nie są bundlowane przez webpacka tylko zaczytywane są po kolei script tagi z HTMLa, co wymusza również ich kolejność. Wówczas jak pierwszy skrypt się wczyta do pamięci i stworzy globalne obiekty np. na window, następne skrypty mogą oczekiwać, że one w tej pamięci już są. Słowo kluczowe declare to podpowiedź dla kompilatora: spodziewaj się, że zmienna varowa/letowa/constowa istnieje i jest określonego typu... nie wnikaj.
Kończąc dygresję dot. declare - to słowo jest bardzo przydatne np. aby na szybko, bez konieczności tworzenia obiektów badać czy nasze typy są kompatybilne.

Wracając do typowania.
Wspólnym elementem 3 obiektów jest zawartość struktury - publiczne pole name typu string - to wystarcza, aby wszystkie obiekty były ze sobą kompatybilne.

Dodatkowo - jeśli w ogóle nie zadeklarujemy żadnego interfejsu, typu ani klasy - i zwyczajnie stworzymy literał obiektu - TypeScript uruchomi wnioskowanie i przypisze obiektowi taki sam typ zawierający jedno publiczne pole string. Ten obiekt jest również kompatybilny ze wszystkimi pozostałymi.
*/

interface Human {
  name: string
}
 
class Person {
  constructor(public name: string) { }
}
 
interface Dog {
  name: string
}

// 1. intro
// 2. słowo kluczowe - instancjonowanie vs declare, opis declare

declare let human: Human
declare let person: Person
declare let dog: Dog

// 3. assignable
 
human = person
person = human
dog = person
person = dog
human = dog
dog = human

// 4. object literal

let ufo = {
  name: "Aquatoid",
}
 
ufo = human
human = ufo
 
// 5. dodanie pól - złamanie kompatybilności, ponieważ kontrakt nie jest spełniony
// do ufo dodajemy age:10
