import React from 'react';
import { Provider } from 'react-redux';
import { EmployeesView } from './EmployeesView';
import { getStore } from '../store';

/**
 * UWAGA! 🔥
 * 
 * Redux z założenia powinien być globalny, czyli osadzony np. w entry file index.tsx
 * "na samej górze" aplikacji. I gdyby to była prawdziwa aplikacja, Redux byłby globalny.
 * 
 * Tutaj jednak robimy wyjątek i Redux jest osadzony głębiej w drzewie tylko z powodów
 * szkoleniowych: chcemy Reduxa "zamknąć" tylko w tej jednej lekcji.
 */
const store = getStore()
export const EmployeesReduxContainer: React.FC = () => {
  return <Provider store={store}>
    <EmployeesView />
  </Provider>
}
