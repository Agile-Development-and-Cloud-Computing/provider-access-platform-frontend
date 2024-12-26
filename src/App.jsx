import { useState } from 'react'
import providerAccessLogo from './assets/pam_logo.png';

function App() {
  return (
    <div className="container text-center mt-5 app-container">
      <h2 className="text-primary">Welcome to Project 3: Access Platform for Providers</h2>
      <div className="logo-container mt-4">
        <img 
          src={providerAccessLogo} 
          alt="Provider Access Management Logo" 
          className="img-fluid rounded"
        />
      </div>
    </div>
  );
}

export default App;
