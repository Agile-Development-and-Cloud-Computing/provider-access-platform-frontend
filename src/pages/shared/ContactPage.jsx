// File: src/pages/ContactPage.jsx
import React from 'react';
import '@/styles/PublicPages.css';

const ContactPage = () => {
  return (
    <div className="form-container contact-container">
      <h1>Contact Us</h1>
      <p>If you have questions or need support, please fill out the form below. We're here to help!</p>

      <form className="contact-form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your full name"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email address"
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Write your message here..."
          rows="5"
          required
        ></textarea>

        <button type="submit" className="submit-btn">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
