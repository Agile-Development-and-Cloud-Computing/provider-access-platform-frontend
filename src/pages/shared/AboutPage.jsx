import React from 'react';
import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer'; 

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <h1>About Us</h1>
        <p>
          The Provider Access Platform enables collaboration between FraUAS and its providers. We focus on simplifying the management of:
        </p>
        <ul>
          <li>Master Agreements</li>
          <li>Service Requests</li>
          <li>Employee Profiles</li>
        </ul>
        <p>
          With our intuitive platform, providers can bid on service requests, track order changes, and monitor performance metrics. Our mission is to foster transparent and efficient provider-client relationships.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
