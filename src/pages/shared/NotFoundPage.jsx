import React from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/NotFoundPage.css"; 

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist or may have been moved.</p>
      <div className="not-found-buttons">
        <button className="btn btn-primary" onClick={goBack}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
