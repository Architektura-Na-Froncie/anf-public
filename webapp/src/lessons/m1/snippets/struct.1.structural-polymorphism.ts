export {}

/*
Jaki wniosek stąd wynika?

Przede wszystkim: deklarowanie RÓŻNYCH interfejsów, typów i klas absolutnie NIE ZABEZPIECZA nas przed przypisywaniem sobie ich obiektów. To uwaga zwłaszcza dla osób, które przyzwyczajone są do typowania Javy i C# - w Javie C# 2 interfejsy bez części wspólnej gwarantują niekompatybilność. W TypeScripcie - nie. Przejrzyjcie swoje TypeScriptowe klasy i typy pod tym kątem, z doświadczenia wiem, że może być różnie.

Jednym z fundamentów programowania obiektowego jest polimorfizm, czyli możliwość używania wielu obiektów różnych klas pod tą samą zmienną, o ile odnosi się ona do jakiejś wyabstrahowanej części wspólnej, np. interfejsu. Polimorfizm sprawia, że w odniesieniu do tej części wspólnej interfejsu, np. jakiejś metody, piszemy jeden kod który obsłuży wszystkie klasy implementujące ten interfejs. I nie ma znaczenia ile tych klas będzie i czy je w przyszłości dodamy - ten jeden kod jest wystarczający.

W typowaniu strukturalnym polimorfizm działa analogicznie jak w typowaniu nominalnym. Różnica polega na tym, że wspólnym mianownikiem do którego kompilator się odnosi nie jest interfejs, a typ zmiennej. A typ zmiennej jest statyczny, nie zmieni się, więc kompilator ma gwarancję, że może używać tego, co wchodzi w skład owego typu.
*/

interface Human {
  name: string
}
declare let human: Human

interface Developer extends Human {
  languages: string[]
}
declare let developer: Developer

interface TaxiDriver extends Human {
  drive(): void
}
declare let taxiDriver: TaxiDriver

interface WebDeveloper extends Developer {
  cutPhotoshopIntoHTML(): void
}
declare let webDeveloper: WebDeveloper

// deklaracja + przypisanie
// actual vs apparent type

human = developer // ✅
developer = human // ❌
human.name // ✅
developer.languages // ✅
human.languages // ❌

// analogicznie...

human = webDeveloper // ✅
webDeveloper = human // ❌
webDeveloper = developer // ❌
human.name // ✅
webDeveloper.cutPhotoshopIntoHTML // ✅
human.cutPhotoshopIntoHTML // ❌

human = taxiDriver // ✅
taxiDriver = human // ❌
human.name // ✅
taxiDriver.drive() // ✅
human.drive() // ❌



