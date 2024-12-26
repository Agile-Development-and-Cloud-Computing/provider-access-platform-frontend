import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const RegisterPage = () => {
  return (
    <>
      <Navbar />
      <div className="register-container">
        <h1>Register</h1>
        <p>Create a provider account to start using the platform:</p>
        <form>
          <label>
            Provider Name:
            <input type="text" name="providerName" required />
          </label>
          <label>
            Admin Username:
            <input type="text" name="adminUsername" required />
          </label>
          <label>
            Password:
            <input type="password" name="password" required />
          </label>
          <label>
            Confirm Password:
            <input type="password" name="confirmPassword" required />
          </label>
          <button type="submit">Register</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
