import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa"; // Importing icons from react-icons

const TeamPage = () => {
  return (
    <div className="team-container">
      <h1>Meet Our Team</h1>
      <p>A talented group of professionals committed to delivering success.</p>
      <div className="team-row">
        
        {/* Wubishet Damtie */}
        <div className="team-card">
          <img
            src="/Wubishet.jpg"
            alt="Wubishet Damtie"
            className="team-image"
          />
          <h2>Wubishet Damtie</h2>
          <h3>Frontend Developer</h3>
          <p>Matriculation Number: 1324950</p>
          
          <div className="contact-icons">
            <a href="https://www.linkedin.com/in/wubishet" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="contact-icon linkedin-link" />
            </a>
            <a href="https://github.com/wubishetD" target="_blank" rel="noopener noreferrer">
              <FaGithub className="contact-icon github-link" />
            </a>
            <a href="mailto:wubishet@provider.com" target="_blank" rel="noopener noreferrer">
              <FaEnvelope className="contact-icon email-link" />
            </a>
          </div>
        </div>

        {/* Anushruthpal Jayapal */}
        <div className="team-card">
          <img
            src="/Anushruthpal.jpg"
            alt="Anushruthpal Keshavathi Jayapal"
            className="team-image"
          />
          <h2>Anushruthpal Jayapal</h2>
          <h3>Frontend Developer</h3>
          <p>Matriculation Number: 1502741</p>
          
          <div className="contact-icons">
            <a href="https://www.linkedin.com/in/anushruthpal-keshavathi-jayapal-441049216/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="contact-icon linkedin-link" />
            </a>
            <a href="https://github.com/Anushruth16" target="_blank" rel="noopener noreferrer">
              <FaGithub className="contact-icon github-link" />
            </a>
            <a href="mailto:anushruthpal.keshavathi-jayapal@stud.fra-uas.de" target="_blank" rel="noopener noreferrer">
              <FaEnvelope className="contact-icon email-link" />
            </a>
          </div>
        </div>

        {/* Lavanya Suresh */}
        <div className="team-card">
          <img
            src="/Lavanya.jpg"
            alt="Lavanya Suresh"
            className="team-image"
          />
          <h2>Lavanya Suresh</h2>
          <h3>Scrum Master</h3>
          <p>Matriculation Number: 1516065</p>

          <div className="contact-icons">
            <a href="https://www.linkedin.com/in/lavanya" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="contact-icon linkedin-link" />
            </a>
            <a href="https://github.com/LavanyaSuresh23" target="_blank" rel="noopener noreferrer">
              <FaGithub className="contact-icon github-link" />
            </a>
            <a href="mailto:lavanya@provider.com" target="_blank" rel="noopener noreferrer">
              <FaEnvelope className="contact-icon email-link" />
            </a>
          </div>
        </div>

        {/* Mandar Gokul Kale */}
        <div className="team-card">
          <img
            src="/Mandar.jpg"
            alt="Mandar Gokul Kale"
            className="team-image"
          />
          <h2>Mandar Gokul Kale</h2>
          <h3>Backend Developer</h3>
          <p>Matriculation Number: 1501517</p>
          
          <div className="contact-icons">
            <a href="https://www.linkedin.com/in/mandar" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="contact-icon linkedin-link" />
            </a>
            <a href="https://github.com/MandarGK" target="_blank" rel="noopener noreferrer">
              <FaGithub className="contact-icon github-link" />
            </a>
            <a href="mailto:mandar@provider.com" target="_blank" rel="noopener noreferrer">
              <FaEnvelope className="contact-icon email-link" />
            </a>
          </div>
        </div>

        {/* Aswini Thirumaran */}
        <div className="team-card">
          <img
            src="/Aswini.jpg"
            alt="Aswini Thirumaran"
            className="team-image"
          />
          <h2>Aswini Thirumaran</h2>
          <h3>Backend Developer</h3>
          <p>Matriculation Number: 1510315</p>
    
          <div className="contact-icons">
            <a href="https://www.linkedin.com/in/aswini" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="contact-icon linkedin-link" />
            </a>
            <a href="https://github.com/AswiniThiru" target="_blank" rel="noopener noreferrer">
              <FaGithub className="contact-icon github-link" />
            </a>
            <a href="mailto:aswini@provider.com" target="_blank" rel="noopener noreferrer">
              <FaEnvelope className="contact-icon email-link" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeamPage;
