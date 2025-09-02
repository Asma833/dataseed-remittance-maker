import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
// import 'primeicons/primeicons.css'; //icons
// import 'primeflex/primeflex.css'; // flex
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
