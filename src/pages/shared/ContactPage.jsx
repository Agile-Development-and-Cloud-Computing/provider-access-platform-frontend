import React from 'react';
//import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/styles/PublicPages.css';

const ContactPage = () => {
  return (
    <>
      <div className="contact-container">
        <section className="contact-info">
          <h1>Contact Us</h1>
          <p>Have questions or need support? We'd love to hear from you!</p>
        </section>

        <section className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="Your Full Name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Your Email Address" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Write your message here..." rows="5" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
