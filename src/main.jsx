import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Import the App component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap global styles
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JavaScript
//import './styles/index.css'; // Import optional custom global styles

// Get the root element from the HTML
const rootElement = document.getElementById('root');

// Create a React root
const root = createRoot(rootElement);

// Render the application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
