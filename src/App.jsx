import { useState } from 'react'
import providerAccessLogo from './assets/pam_logo.png'
import './styles/App.css'

function App() {
  return (
    <>
      <div className="logo-container">
        <img src={providerAccessLogo} alt="Provider Access Management Logo" className="logo" />
      </div>
    </>
  )
}

export default App

