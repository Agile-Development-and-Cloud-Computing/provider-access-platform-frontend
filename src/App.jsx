import { useState } from 'react'
import providerAccessLogo from './assets/pam_logo.png'
import './styles/App.css'

function App() {
  return (
    <div className="app-container">
      <h2>Welcome to Project 3: Access Platform for Providers</h2>
      <div className="logo-container">
        <img src={providerAccessLogo} alt="Provider Access Management Logo" />
      </div>
    </div>
  )
}

export default App
