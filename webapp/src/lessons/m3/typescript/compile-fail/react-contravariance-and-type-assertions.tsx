import { mockJohn } from '../../../../mocks'
import { ItemsList } from '../RenderProp'
import { CompanyEmployee, Developer, Manager, ManagerView, DeveloperView, CompanyEmployeeView } from '../UnionProps';

/**
 * Plik ilustruje przykładowe błędy związane z kontrawariancją
 * a na końcu pliku ilustrujemy, że z type assertions, trzeba ostrożnie
 * 
 * Posłużymy się ItemsList (generycznym komponentem z render props)
 */

const manager: Manager = { ...mockJohn, type: "MANAGER", department: "IT" };
const developer: Developer = { ...mockJohn, type: "DEVELOPER", languages: ['JavaScript', 'TypeScript'] };
const companyEmployees: CompanyEmployee[] = [
  manager,
  developer,
]

// 1. wywnioskowany generyk CompanyEmployee
const el1 = <ItemsList
  items={companyEmployees} // wnioskowanie
  renderItem={m => <ManagerView manager={m} />} //  ❌ a co jeśli będzie Developer?
/>

// 2. "wymuszony" z callbacka generyk Manager
const el2 = <ItemsList
  renderItem={(m: Manager) => <ManagerView manager={m} />} // wymuszony Manager
  items={companyEmployees} // ❌ jak ma być Manager, to Developer nie pasuje
/>

// 3. explicite podany generyk CompanyEmployee
// kontrawariancja: spodziewana była funkcja przyjmująca CompanyEmployee, typ szerszy
//                  my przekazujemy funkcję przyjmującą Manager, typ węższy, ta funkcja jest nie-w-pełni-funkcjonalna
// dodatkowo komunikat błędu jest odwrócony: tam gdzie był oczekiwany CompanyEmployee/szerszy, wstawiliśmy Manager/węższy
// więc teoretycznie powinno być: ❌ Type 'Manager' is not assignable to type 'CompanyEmployee'.
// ale że parametr funkcji jest na pozycji kontrawariancyjnej, to następuje odwrócenie i mamy
// ❌ Type 'CompanyEmployee' is not assignable to type 'Manager'.
const el3 = <ItemsList<CompanyEmployee>
  items={companyEmployees}
  renderItem={(m: Manager) => <ManagerView manager={m} />} // ❌ pozycja kontrawariancyjna
/>


// 4. type assertions
// ❌ błędnie zastosowane - wycisza błąd, który poleci w runtime

// a co powiecie na to?
// jakie będzie to miało konsekwencje?
// ...
// potencjalnie poleci TypeError w runtime, bo ItemList przyjmuje szerszy typ, a obsłużony może być tylko węższy
// pamiętajmy, że w każdym miejscu, gdzie wstawiamy "as", oszukujemy kompilator
// róbmy to tylko, kiedy mamy pewność, że nie przepuszczamy błędów do runtime'u
const el4 = <ItemsList
  items={companyEmployees}
  renderItem={m => <ManagerView manager={m as Manager} />}
/>
