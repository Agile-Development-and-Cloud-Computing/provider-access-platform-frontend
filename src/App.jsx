// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import AppRoutes from '@/routes/AppRoutes';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* <Navbar /> Navbar is always visible */}
        <Navbar /> {/* Navbar will dynamically render based on authentication */}
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
