import React from 'react';
import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer'; 

const TeamPage = () => {
  return (
    <>
      <Navbar />
      <div className="team-container">
        <h1>Meet Our Team</h1>
        <p>
          We will upload the profiles of our team here.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default TeamPage;
