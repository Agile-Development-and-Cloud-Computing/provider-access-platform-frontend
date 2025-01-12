import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <img
          src="/cloud-image.png" // Ensure this is in your public folder
          alt="Cloud"
          style={{ maxWidth: '150px', marginBottom: '1rem' }}
        />
        <h1 className="display-4 fw-bold">Welcome!</h1>
        <p className="lead">This is Access Provider Platform.</p>
        <p>
          Already part of the team?{' '}
          <a href="/login" className="text-warning">
            Login
          </a>
        </p>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
