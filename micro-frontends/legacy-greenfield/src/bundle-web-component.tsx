import ReactWebComponent from 'react-web-component';
import App from './App';

// 🔥 z shadow DOMem:
// ReactWebComponent.create(<App isWebComponent />, 'employees-list', true);
// 🔥 bez shadow DOM:
ReactWebComponent.create(<App isWebComponent />, 'employees-list', false);
