export { }

// mamy znowu te same interfejsy co wcześniej

interface Human {
  name: string
}
declare let someone: Human

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

// i deklarujemy kilka funkcji, które przyjmują te interfejsy w parametrach

declare function processHuman(h: Human): void
declare function processDeveloper(d: Developer): void
declare function processWebDeveloper(d: WebDeveloper): void
declare function processTaxiDriver(td: TaxiDriver): void

// kontrawariancja i pozycja kontrawariancyjna - o tym będzie przy okazji strictFunctionTypes

declare function appEngine(processFn: (d: Developer) => void): void
appEngine(processDeveloper) // ✅
appEngine(processHuman) // ✅
appEngine(processWebDeveloper) // ❌





// przecięcia funkcji

// funkcja docelowa jest jednocześnie funkcją przetwarzającą i kierowców i webdeveloperów
type ProcessEmployeeFunctionIntersection =
  & typeof processWebDeveloper
  & typeof processTaxiDriver
declare let processEmployeeI: ProcessEmployeeFunctionIntersection
// przecięcie funkcji działa jak function overload
// czy przekażemy developera, czy taxi driver - jest git
processEmployeeI(webDeveloper)
processEmployeeI(taxiDriver)

// unie funkcji

// funkcja docelowa jest jedną z funkcji: albo przetwarzającą kierowców albo przetwarzającą webdeveloperów
// ale nie wiadomo którą (!)
type ProcessEmployeeFunctionUnion =
  | typeof processWebDeveloper
  | typeof processTaxiDriver
declare let processEmployeeU: ProcessEmployeeFunctionUnion
// nie wiadomo na którą funkcję trafimy, więc jeśli arguemnt przekazujemy, to musi "zadziałać" z obiema funkcjami
// poniższe wywołania mogą być - hipotetycznie - na krzyż (np. taxidriver trafia do funkcji obsługującej webdevelopera), więc failuje
processEmployeeU(webDeveloper) // ❌ 🤯
processEmployeeU(taxiDriver) // ❌ 🤯
// contravariant position - mimo że funkcje mają unie, ich parametry są "odwrócone" -oczekiwane są przecięcia (!)

const drivingWebDeveloper = { ...webDeveloper, ...taxiDriver } // umie wszystko!
// drivingWebDeveloper, czy trafi do jednej czy do drugiej funkcji - spełni oczekiwania:
processEmployeeU(drivingWebDeveloper) // 😅
// processEmployeeU jest albo funkcją znającą kierowców albo webdevów
// co musiałoby się wydarzyć, aby mieć pewność, że wywołanie będzie bezpieczne?
// jeśli damy kogoś, kto jest jednocześnie webdevem i kierowcą, to która by funkcja nie była, poradzi sobie




// abstrahując od parametrów funkcji które są na kontrawariancyjnej pozycji, typ jest unią, więc możemy przypisać dowolny element unii
processEmployeeU = processWebDeveloper // ✅
processEmployeeU = processTaxiDriver // ✅

// a w przypadku przecięcia? to co przypiszemy musiałoby być jednocześnie i jednym i drugim
processEmployeeI = processWebDeveloper // ❌
processEmployeeI = processTaxiDriver // ❌
// skoro ANI processWebDeveloper ANI processTaxiDriver nie jest kompatybilne z sygnaturą processEmployeeI, to jak taka funkcja mogłaby wyglądać?

// musiałaby obsługiwać w parametrze i TaxiDriver i WebDeveloper! 🤔
// ojej - znowu mamy ODWRÓCENIE! processEmployeeI jest PRZECIĘCIEM funkcji, a parametr jest UNIĄ... 😳
// i to jest właśnie pozycja KONTRAwariancyjna. 🤓
processEmployeeI = (employee: TaxiDriver | WebDeveloper) => {
  if (isWebDeveloper(employee)) {
    processWebDeveloper(employee)
  } else {
    processTaxiDriver(employee)
  }
  // exhaustiveness check
}

function isWebDeveloper(thing: any): thing is WebDeveloper {
  return thing.cutPhotoshopIntoHTML && thing.languages
}
