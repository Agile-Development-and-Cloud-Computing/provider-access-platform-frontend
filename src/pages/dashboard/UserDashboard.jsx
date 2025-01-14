import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserDashboardNavbar from '../../components/UserDashboardNavbar';
import Footer from '../../components/Footer';
import '../../styles/dashboard.css';

const Dashboard = () => {
  const [selectedSection, setSelectedSection] = useState('userManagement');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({}); // Track which items are expanded
  const [bidForm, setBidForm] = useState({ visible: false, role: null, domain: null });
  const [formData, setFormData] = useState({ providerName: '', quotePrice: '' });
  const [formError, setFormError] = useState('');



  const fetchData = async (endpoint) => {
    setLoading(true);
    setError(null);
	try {
		const response = await axios.get(endpoint);
		console.log("API Response from Fetch Data Function:", response.data);
  
		// Process response for masterAgreement section
		if (selectedSection === "masterAgreement") {
		  if (response.data && response.data.data && Array.isArray(response.data.data)) {
			// Iterate and map the data to the desired format
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
					roleId:role.roleId,
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
		} else {
		  setError("Selected section is not supported.");
		}
	  } catch (err) {
		console.error("Error fetching data:", err);
		setError("Failed to fetch data.");
	  } finally {
		setLoading(false);
	  }
  };


  useEffect(() => {
    if (selectedSection === 'userManagement') {
      fetchData('https://api.example.com/user-management');
    } else if (selectedSection === 'serviceAgreements') {
      fetchData('https://api.example.com/service-agreements');
    } else if (selectedSection === 'masterAgreement') {
      fetchData('http://localhost:8080/api/provider/master-agreements');
    }
  }, [selectedSection]);

  const toggleDetails = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle expanded state
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

  const handleSubmit = async(e) => {
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
      // API call to submit bid
      const response = await axios.post('http://localhost:8080/api/provider/bid', {
        domainId :bidForm.domain.domainId,
        domainName: bidForm.domain.domainName, 
		roleId : bidForm.role.roleId,
        role: bidForm.role.roleName,
		level:bidForm.role.experienceLevel,
        masterAgreementTypeId: bidForm.agreement.masterAgreementTypeId,
        masterAgreementTypeName: bidForm.agreement.masterAgreementTypeName,
        provider: providerName,
        bidPrice: parseFloat(bidPrice)
      });

      console.log("API Response: ", response.data);

      // Check if the API response indicates the offer doesn't exist
    if (response.data.success === false) {
      setFormError(response.data.message || 'Failed to place bid. Please contact admin.');
      return;
    }

      console.log('Bid submitted successfully:', response.data);
      alert('Bid successfully placed!');

      // Close the form
      setBidForm({ visible: false, role: null, domain: null });
    } catch (err) {
      console.error('Failed to submit bid:', err);
      setFormError('Failed to submit bid. Please try again.');
    }
  };

  const renderContent = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!data ) return <p>Select a section to view its contents.</p>;   

    
    return (
		<div className="data-container">
		  {loading && <p>Loading...</p>}
		  {error && <p style={{ color: 'red' }}>{error}</p>}
		  
		  {data.map((agreement, index) => (
			<div key={index} className="data-summary-box">
			  <h2 className="agreement-heading">{agreement.masterAgreementTypeName}</h2>
			  <p className="valid-until">
				<strong>Valid Until:</strong> {agreement.validUntil}
			  </p>
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
							<h4 className="role-name">{role.roleName} (Role ID: {role.roleId})</h4>
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
      <UserDashboardNavbar onSelectSection={setSelectedSection} />
      <div className="dashboard-container">
        <h1>Welcome to Your Dashboard</h1>
        {renderContent()}
      </div>

      {/* Bid Form Modal */}
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
        {formError && <p className="form-error">{formError}</p>} {/* Show error message */}
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


      <Footer />
    </div>
  );
};

export default Dashboard;
