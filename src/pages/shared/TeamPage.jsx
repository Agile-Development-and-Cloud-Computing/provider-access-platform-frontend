import React from 'react';
//import '@/styles/PublicPages.css';

const TeamPage = () => {
  return (
    <>
      <div className="team-container">
        <h1>Meet Our Team</h1>
        <p>
          A talented group of professionals committed to delivering success.
        </p>
        <div className="team-row">
          <div className="team-card">
            <h2>Wubishet Damtie</h2>
            <h3>Frontend Developer</h3>
            <p>Email: <a href="mailto:wubishet@example.com">wubishet@provider.com</a></p>
          </div>
          <div className="team-card">
            <h2>Anushruthpal Jayapal</h2>
            <h3>Frontend Developer</h3>
            <p>Email: <a href="mailto:anushruthpal@example.com">anushruthpal@provider.com</a></p>
          </div>
          <div className="team-card">
            <h2>Lavanya Suresh</h2>
            <h3>Scrum Master</h3>
            <p>Email: <a href="mailto:lavanya@example.com">lavanya@provider.com</a></p>
          </div>
          <div className="team-card">
            <h2>Mandar Gokul Kale</h2>
            <h3>Backend Developer</h3>
            <p>Email: <a href="mailto:mandar@example.com">mandar@provider.com</a></p>
          </div>
          <div className="team-card">
            <h2>Aswini Thirumaran</h2>
            <h3>Backend Developer</h3>
            <p>Email: <a href="mailto:aswini@example.com">aswini@provider.com</a></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamPage;
