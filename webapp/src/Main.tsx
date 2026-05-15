import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppFooter } from 'ui/app/AppFooter';
import { AppHeader } from 'ui/app/AppHeader';
import { AppMain } from 'ui/app/AppMain';

import { EmployeePlans } from 'ui/employee-plans/EmployeePlans';
import { Welcome } from 'ui/app/Welcome';


export const Main: React.FC = () => {
  return (
    <div className="App">
      <AppHeader/>
      <AppMain>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/employee-plans" element={<EmployeePlans />} />
          <Route path="/account-history" element={"Treść pojawi się w module 4: Zarządzanie stanem - Hooks & Contexts"} />
          <Route path="/exam" element={"Treść pojawi się w module 4: Zarządzanie stanem - Hooks & Contexts"} />
          <Route path="/authorize-device" element={"Treść pojawi się w module 6: Maszyny stanowe"} />
          <Route path="/change-limits" element={"Treść pojawi się w module 6: Maszyny stanowe"} />
          <Route path="/currency-exchange" element={"Treść pojawi się w module 8: Programowanie Reaktywne"} />
        </Routes>
      </AppMain>
      <AppFooter/>
    </div>
  )
}
