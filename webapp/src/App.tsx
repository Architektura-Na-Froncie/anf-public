import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import './styles/fonts.css';

import { Main } from 'Main';

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  )
}

export default App;
