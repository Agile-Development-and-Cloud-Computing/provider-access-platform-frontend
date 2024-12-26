import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <div className="login-container">
        <h1>Login</h1>
        <p>Access your provider account by logging in below:</p>
        <form>
          <label>
            Username:
            <input type="text" name="username" required />
          </label>
          <label>
            Password:
            <input type="password" name="password" required />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
