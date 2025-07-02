// src/pages/management/MasterAgreementPage.jsx
import React, { useState, useEffect } from 'react';
// Removed AdminDashboardNavbar import
import '@/styles/MasterAgreementPage.css';
import masterAgreementService from '@/services/masterAgreementService';

const MasterAgreementPage = () => {
  const [selectedSection, setSelectedSection] = useState('userManagement');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [bidForm, setBidForm] = useState({ visible: false, role: null, domain: null });
  const [formData, setFormData] = useState({ providerName: '', bidPrice: '' });
  const [formError, setFormError] = useState('');

  const providerId = localStorage.getItem("providerId");
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No authentication token found");
  }


  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await masterAgreementService.getMasterAgreements();
      console.log("API Response:", response);

      if (response && response.success && Array.isArray(response.data)) {
        const transformedData = response.data.map((agreement) => ({
          masterAgreementTypeId: agreement.masterAgreementTypeId,
          masterAgreementTypeName: agreement.masterAgreementTypeName,
          validFrom: agreement.validFrom,
          validUntil: agreement.validUntil,
          status: agreement.status,
          domains: agreement.domains.map((domain) => ({
            domainId: domain.domainId,
            domainName: domain.domainName,
            roleOffer: domain.roleOffer.map((role) => ({
              roleId: role.roleId,
              roleName: role.roleName,
              experienceLevel: role.experienceLevel,
              technologiesCatalog: role.technologiesCatalog,
              quotePrice: role.quotePrice,
            })),
          })),
        }));

        setData(transformedData);
      } else {
        setError("Data format is incorrect. Expected a valid 'data' array.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleDetails = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleBidClick = (role, domain, agreement) => {
    setBidForm({ visible: true, role, domain, agreement });
    setFormData({ providerName: '', bidPrice: '' });
    setFormError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { providerName, bidPrice } = formData;

    if (!providerName) {
      setFormError('Provider Name is required');
      return;
    }
    if (!bidPrice || parseFloat(bidPrice) >= bidForm.role.quotePrice) {
      setFormError(`Quote Price must be less than ${bidForm.role.quotePrice}`);
      return;
    }

    try {
      const response = await masterAgreementService.placeBid({
        domainId: bidForm.domain.domainId,
        domainName: bidForm.domain.domainName,
        roleId: bidForm.role.roleId,
        role: bidForm.role.roleName,
        level: bidForm.role.experienceLevel,
        masterAgreementTypeId: bidForm.agreement.masterAgreementTypeId,
        masterAgreementTypeName: bidForm.agreement.masterAgreementTypeName,
        provider: providerName,
        providerId:providerId,
        bidPrice: parseFloat(bidPrice),
      });

      console.log("API Response: ", response);

      if (response.success === false) {
        setFormError(response.message || 'Failed to place bid. Please contact admin.');
        return;
      }

      alert('Bid successfully placed!');
      setBidForm({ visible: false, role: null, domain: null });
    } catch (err) {
      console.error('Failed to submit bid:', err);
      setFormError('Failed to submit bid. Please try again.');
    }
  };

  const renderContent = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!data) return <p>Select a section to view its contents.</p>;

    return (
      <div className="data-container">
        {data.map((agreement, index) => (
          <div key={index} className="data-summary-box">
            <h2 className="agreement-heading">{agreement.masterAgreementTypeName}</h2>
            <p className="valid-until"><strong>Valid Until:</strong> {agreement.validUntil}</p>
            <button onClick={() => toggleDetails(index)} className="toggle-details-button">
              {expanded[index] ? 'Hide Details' : 'Show Details'}
            </button>

            {expanded[index] && (
              <div className="data-details">
                {agreement.domains.map((domain, domainIndex) => (
                  <div key={domainIndex} className="domain-section">
                    <h3 className="domain-heading">{domain.domainName} Opportunities</h3>
                    <div className="roles-container">
                      {domain.roleOffer.map((role, roleIndex) => (
                        <div key={roleIndex} className="role-card">
                          <h4 className="role-name">{role.roleName}</h4>
                          <p><strong>Experience Level:</strong> {role.experienceLevel}</p>
                          <p><strong>Technologies:</strong> {role.technologiesCatalog}</p>
                          <p><strong>Quote Price:</strong> ${role.quotePrice}</p>
                          <button 
                            className="bid-button"
                            onClick={() => handleBidClick(role, domain, agreement)}
                          >
                            Place Your Bid
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <h1>Master Agreements</h1>
        {renderContent()}
      </div>

      {bidForm.visible && (
        <div className="bid-form-modal">
          <form onSubmit={handleSubmit} className="bid-form">
            <h2>Place Your Bid for {bidForm.role.roleName}</h2>
            <p><strong>Domain:</strong> {bidForm.domain.domainName}</p>
            <p><strong>Max Quote Price:</strong> ${bidForm.role.quotePrice}</p>
            <div className="form-group">
              <label htmlFor="providerName">Provider Name</label>
              <input
                type="text"
                name="providerName"
                value={formData.providerName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bidPrice">Bid Price</label>
              <input
                type="number"
                name="bidPrice"
                value={formData.bidPrice}
                onChange={handleInputChange}
                required
              />
            </div>
            {formError && <p className="form-error">{formError}</p>}
            <button type="submit" className="submit-button">Submit</button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setBidForm({ visible: false, role: null, domain: null })}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MasterAgreementPage;
