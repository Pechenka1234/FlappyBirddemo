import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './global.css';

console.log('Starting app...');
console.log('React version:', React.version);
console.log('ReactDOM:', ReactDOM);
console.log('ReactDOM version:', ReactDOM.version || 'undefined');

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log('Root created:', root);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
console.log('App rendered');