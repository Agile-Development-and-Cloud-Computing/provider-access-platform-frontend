import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/styles/PublicPages.css';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <section className="about-header">
          <h1>About Us</h1>
          <p>
            The Provider Access Platform is an innovative solution that simplifies and streamlines collaboration between FraUAS and its providers.
          </p>
        </section>

        <section className="about-highlight">
          <h2>Our Mission</h2>
          <p>
            To empower providers with tools for seamless management of master agreements, service requests, and employee profiles, fostering transparent and efficient relationships.
          </p>
        </section>

        <section className="about-features">
          <h2>Key Features</h2>
          <ul>
            <li>Streamlined management of Master Agreements.</li>
            <li>Real-time bidding and tracking for Service Requests.</li>
            <li>Secure handling of Employee Profiles and data.</li>
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
