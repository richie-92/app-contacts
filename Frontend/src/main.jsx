import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Obtiene el elemento HTML utilizado como punto de montaje de React.
const rootElement = document.getElementById('root');

// Monta la aplicación React en el elemento raíz.
createRoot(rootElement).render(
    <StrictMode>
        <App />
    </StrictMode>
);
