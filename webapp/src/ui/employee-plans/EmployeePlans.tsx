import React from 'react';
import { EmployeesView } from 'lessons/m3/homework/optimize/EmployeesView';
// Poniższy import w storybooku działa, ale w webappie nie. Zadanie dla chętnych:
// - znajdź przyczynę + zaproponuj w jaki jednolity sposób można rozwiązać problem dla storybooka i webapp
// import { EmployeesView } from 'lessons/m4/react-query/EmployeesView';
// Odkomentuj poniższy import aby użyć implementacji widoku opartej o Redux
// import { EmployeesReduxContainer as EmployeesView } from 'lessons/m5/employee-plans/components/EmployeesReduxContainer';

export const EmployeePlans: React.FC = () => {
  return <EmployeesView />
}
