import React from 'react';
import { Link, Routes, Route } from "react-router-dom";

import { Home } from './Home';

import { EmployeesLoader } from './mfe/EmployeesLoader';
import { SettingsLoader } from './mfe/SettingsLoader';

import classes from './App.module.css';

function App() {
  return (
    <div className={classes.layout}>
      <h1 className={classes.layoutTitle}>Module-federation micro-frontends demo</h1>
      <nav className={classes.layoutNav}>
        <Link to="/">Home</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/settings">Settings</Link>
      </nav>
      <div className={classes.layoutRoute}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="employees" element={<EmployeesLoader />} />
          <Route path="settings" element={<SettingsLoader />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
