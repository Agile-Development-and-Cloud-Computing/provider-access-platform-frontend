import React, { useState, useEffect } from 'react';
import AdminDashboardNavbar from '../../components/AdminDashboardNavbar';
import Footer from '../../components/Footer';
import '../../styles/MasterAgreementPage.css';
import axios from 'axios';

const MasterAgreementPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [bidForm, setBidForm] = useState({ visible: false, role: null, domain: null });
  const [formData, setFormData] = useState({ providerName: '', bidPrice: '' });
  const [formError, setFormError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8080/api/provider/master-agreements');
      if (response.data && Array.isArray(response.data.data)) {
        const transformedData = response.data.data.map((agreement) => ({
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
        setError('Invalid data format.');
      }
    } catch (err) {
      setError('Failed to fetch data.');
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
      const response = await axios.post('http://localhost:8080/api/provider/bid', {
        domainId: bidForm.domain.domainId,
        domainName: bidForm.domain.domainName,
        roleId: bidForm.role.roleId,
        role: bidForm.role.roleName,
        level: bidForm.role.experienceLevel,
        masterAgreementTypeId: bidForm.agreement.masterAgreementTypeId,
        masterAgreementTypeName: bidForm.agreement.masterAgreementTypeName,
        provider: providerName,
        bidPrice: parseFloat(bidPrice),
      });

      if (response.data.success === false) {
        setFormError(response.data.message || 'Failed to place bid. Please contact admin.');
        return;
      }

      alert('Bid successfully placed!');
      setBidForm({ visible: false, role: null, domain: null });
    } catch (err) {
      setFormError('Failed to submit bid. Please try again.');
    }
  };

  const renderContent = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!data) return <p>No agreements available.</p>;

    return data.map((agreement, index) => (
      <div key={index} className="data-summary-box">
        <h2 className="agreement-heading">{agreement.masterAgreementTypeName}</h2>
        <p className="valid-until">Valid Until: {agreement.validUntil}</p>
        <button onClick={() => toggleDetails(index)} className="toggle-details-button">
          {expanded[index] ? 'Hide Details' : 'Show Details'}
        </button>
        {expanded[index] && (
          <div className="data-details">
            {agreement.domains.map((domain, domainIndex) => (
              <div key={domainIndex} className="domain-section">
                <h3 className="domain-heading">{domain.domainName}</h3>
                <div className="roles-container">
                  {domain.roleOffer.map((role, roleIndex) => (
                    <div key={roleIndex} className="role-card">
                      <h4 className="role-name">{role.roleName}</h4>
                      <p>Experience Level: {role.experienceLevel}</p>
                      <p>Technologies: {role.technologiesCatalog}</p>
                      <p>Quote Price: ${role.quotePrice}</p>
                      <button className="bid-button" onClick={() => handleBidClick(role, domain, agreement)}>
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
    ));
  };

  return (
    <div className="master-agreement-wrapper">
      <AdminDashboardNavbar />
      <div className="master-agreement-container">
        <h1 className="agreement-heading">Master Agreements</h1>
        {renderContent()}
      </div>
      {bidForm.visible && (
        <div className="bid-form-modal">
          <form onSubmit={handleSubmit} className="bid-form">
            <h2>Place Your Bid</h2>
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
            <button type="submit" className="submit-button">
              Submit
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => setBidForm({ visible: false })}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MasterAgreementPage;
