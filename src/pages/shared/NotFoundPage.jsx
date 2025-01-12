import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <div className="notfound-container">
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you are looking for doesn't exist.</p>
        <a href="/">Return to Home</a>
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;
