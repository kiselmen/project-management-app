import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
// import './index.css';
import reportWebVitals from './reportWebVitals';
import './i18n/config';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

reportWebVitals();
