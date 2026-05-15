import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import "./root.component.css";

function Home() {
  // Normalnie ogarnęlibyśmy to osobną apką, ale żeby pokazać jeden
  // element z tekstem to jest to trochę overkill.
  return <p style={{ marginTop: '40px', textAlign: 'center' }}>Wybierz mikro-front z menu powyżej</p>;
}

export default function Root() {
  return (
    <BrowserRouter>
      <h1 className="layoutTitle">Single-SPA micro-frontends</h1>
      <nav className="layoutNav">
        <Link to="/" className="link">Home</Link>
        <Link to="/employees" className="link">Pracownicy</Link>
        <Link to="/settings" className="link">Ustawienia</Link>
        <Link to="/settings-angular" className="link">Ustawienia (Angular)</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={null} />
      </Routes>
    </BrowserRouter>
  );
}
