import React from 'react';
import '@/styles/PublicPages.css';

const AboutPage = () => {
  return (
    <>
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
        <p>Streamlined management of Master Agreements.</p>
        <p>Real-time bidding and tracking for Service Requests.</p>
        <p>Secure handling of Employee Profiles and data.</p>
        </section>
      </div>
    </>
  );
};

export default AboutPage;
