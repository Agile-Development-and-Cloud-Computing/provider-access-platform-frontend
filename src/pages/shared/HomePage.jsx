import React from "react";
//import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/HomePage.css"; // Import the CSS for styling

const HomePage = () => {
  return (
    <>
      <div className="home-container">
        {/* Full-width image */}
        <div className="image-container">
          <img
            src="/cloud-image.png" // Ensure this image is located in your public folder
            alt="Cloud"
            className="full-width-image"
          />
        </div>

        {/* Welcome message */}
        <div className="content">
          <h1 className="display-6 fw-bold">Welcome to Provider Access Platform!</h1>
          <p className="lead">Your gateway to seamless provider management</p>
          <p>
            Already part of the team?{' '}
            <a href="/login" className="text-warning">
              Login
            </a>
          </p>
        </div>

        {/* Main functions in three columns */}
        <div className="features-container">
          <div className="feature">
            <h3>Master Agreements</h3>
            <p>Easily manage and track contracts with clarity and precision.</p>
          </div>
          <div className="feature">
            <h3>Service Requests</h3>
            <p>Streamline bidding and order tracking in real-time.</p>
          </div>
          <div className="feature">
            <h3>Employee Management</h3>
            <p>Upload and manage employee data securely.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;