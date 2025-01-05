import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Ensure the syntax is correct and properly closed
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
