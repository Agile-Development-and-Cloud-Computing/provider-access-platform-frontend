// src/App.jsx

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './styles/App.css'; // Import the CSS file

function App() {
  return (
    <div className="app-container">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;

