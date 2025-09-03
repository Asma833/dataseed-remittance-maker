import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
// import 'primereact/resources/themes/lara-light-blue/theme.css'; // Prime theme
// import 'primereact/resources/primereact.min.css'; //core css
// import './styles/prime-theme-overrides.css'; // app theme overrides for Prime
// Using react-icons for icons; PrimeIcons CSS not required
// import 'primeflex/primeflex.css'; // flex
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
