import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>
          Need assistance? Reach out to our support team.
        </p>
        <p>
          <strong>Email:</strong> support@providerplatform.com
          <br />
          <strong>Phone:</strong> +49 17684942784
        </p>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <label>
            Email:
            <input type="email" name="email" />
          </label>
          <label>
            Message:
            <textarea name="message"></textarea>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
