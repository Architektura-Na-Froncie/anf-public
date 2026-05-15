import { Person } from '../../../mocks'
import { exhaustiveCheck } from '../../../lib/lang'

/**
 * 🔥 UNION PROPS
 * 
 * Czyli props, którego wartością jest UNIA (np. obiektów)
 * Zastosowanie mają reguły kompatybilności unii - czyli
 * wewnątrz komponent musimy sprawdzić, z którym elementem unii mamy faktycznie do czynienia
 */

// na wejściu mamy 2 typy (Manager i Developer, oba rozszerzają Person)
// oraz odpowiadające im wizualne komponenty

export type Manager = Person & {
  type: "MANAGER"
  department: string
}
// declare const ManagerView: React.FC<{ manager: Manager }>
export const ManagerView: React.FC<{ manager: Manager }> = (props) => {
  const { manager: m } = props
  return <>{m.firstName} {m.lastName}, manager of {m.department} department</>
}

export type Developer = Person & {
  type: "DEVELOPER"
  languages: string[]
}
// declare const DeveloperView: React.FC<{ developer: Developer }>
export const DeveloperView: React.FC<{ developer: Developer }> = (props) => {
  const { developer: d } = props
  return <>{d.firstName} {d.lastName}, known languages: {d.languages.join(', ')}</>
}

// tworzymy typ unii (elementy: managerowie i/lub developerzy)
// i chcemy zrobić komponent, który wyświetli pod-komponent adekwatny do typu

export type CompanyEmployee =
  | Manager
  | Developer

interface EmployeeListingProps {
  employees: CompanyEmployee[]
}
export const CompanyEmployeeList: React.FC<EmployeeListingProps> = (props) => {
  const { employees } = props
  return <ul>{
    employees.map(e => {
      // extract to:
      // return <li key={e.id}><CompanyEmployeeView employee={e} /></li>
      if (e.type === 'DEVELOPER') {
        return <li key={e.id}><DeveloperView developer={e} /></li>
      } else if (e.type === 'MANAGER') {
        return <li key={e.id}><ManagerView manager={e} /></li>
      } else {
        return exhaustiveCheck(e, 'Employee')
      }
    })
  }</ul>
}



// wyekstraktowane z listingu
export const CompanyEmployeeView: React.FC<{ employee: CompanyEmployee }> = (props) => {
  const { employee: e } = props
  if (e.type === 'DEVELOPER') {
    return <DeveloperView developer={e} />
  } else if (e.type === 'MANAGER') {
    return <ManagerView manager={e} />
  } else {
    return exhaustiveCheck(e, 'Employee')
  }
}
