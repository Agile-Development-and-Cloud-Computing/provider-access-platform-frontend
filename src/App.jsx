import React from 'react';
import Navbar from './components/Navbar';
import WelcomeSection from './components/WelcomeSection';
import Footer from './components/Footer';
import './styles/App.css'; // Global styles

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <WelcomeSection />
      <Footer />
    </div>
  );
}

export default App;
