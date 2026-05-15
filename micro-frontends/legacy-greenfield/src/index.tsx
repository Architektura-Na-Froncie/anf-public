/* eslint-disable import/first */
import React from 'react';
import ReactDOM from 'react-dom';

import './pubsub';

window.PubSub.subscribe(arg => console.info('vulgar subscriber', arg));

import App from './App';
import './index.css';

import './bundle-web-component';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// 🔥 schowaj komponent reaktowy (uruchamiany przez ReactDOM.render):
// document.getElementById('root')!.hidden = true
