import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WelcomeSection from './WelcomeSection';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <WelcomeSection />
      <Footer />
    </>
  );
};

export default HomePage;
