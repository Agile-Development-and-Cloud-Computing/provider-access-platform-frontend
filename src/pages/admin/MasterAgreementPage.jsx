import React, { useEffect, useState } from 'react';
import ProviderAdminNavbar from '../../components/ProviderAdminNavbar';
import Footer from '../../components/Footer';
import '../../styles/MasterAgreementPage.css';

const MasterAgreementPage = () => {
  const [masterAgreements, setMasterAgreements] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMasterAgreements = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/master-agreements'); // Mock server API
        if (!response.ok) throw new Error('Failed to fetch Master Agreements');
        const data = await response.json();
        setMasterAgreements(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMasterAgreements();
  }, []);

  return (
    <>
      <ProviderAdminNavbar />
      <div className="master-agreement-container">
        <h1>Master Agreements</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="agreements-list">
          {masterAgreements.length > 0 ? (
            masterAgreements.map((agreement) => (
              <div key={agreement.id} className="agreement-card">
                <h2>{agreement.title}</h2>
                <p>{agreement.description}</p>
                <p>
                  <strong>Validity:</strong> {agreement.validity}
                </p>
              </div>
            ))
          ) : (
            <p>No agreements available.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MasterAgreementPage;
