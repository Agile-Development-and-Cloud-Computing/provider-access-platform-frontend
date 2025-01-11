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


  
// Mapping function
const mapApiResponseToDesiredFormat = (apiResponse) => {
  console.log("API Response -->", apiResponse);  // Log the raw API response to check structure
  
  // Adjust the mapping based on the provided format:
  return apiResponse.map((agreement) => ({
    masterAgreementTypeId: agreement.agreementId,  // Mapping directly from the response
    masterAgreementTypeName: agreement.name,       // Mapping directly from the response
    validFrom: agreement.validFrom.split('T')[0],   // Date-only format for validFrom
    validUntil: agreement.validUntil.split('T')[0], // Date-only format for validUntil
    status: agreement.status,
    createdAt: agreement.createdAt.split('T')[0],   // Date-only format for createdAt
    domains: agreement.agreementDetails.map((detail) => ({
      domainId: detail.domainId,
      domainName: detail.domainName,
      roleOffer: detail.roleDetails.map((role) => ({
        roleName: role.role,
        experienceLevel: role.level,
        technologiesCatalog: role.technologyLevel,
        quotePrice: parseFloat(role.price),
    
      })),
    })),
  }));
};


  const fetchData = async (endpoint) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(endpoint);
  
      console.log("API Response from Fetch Data Function"+response.data);
      // Check if response.data contains "agreements"
      /*
      if (Array.isArray(response.data)) {
        setData(response.data); // Set data directly to the array of agreements
      }
      */
      if (selectedSection === 'masterAgreement') {
        const transformedData = mapApiResponseToDesiredFormat(response.data);
        setData(transformedData);


        // After mapping the data, call the POST API to insert the data into your tables
        insertMappedData(transformedData);

      } else {
        setError('Data format is incorrect. Expected an array.');
      }
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const insertMappedData = async (mappedData) => {
	try {
	  console.log(mappedData);
	  // Send the mapped data to your POST API
	  // If the backend expects a single agreement, we send each one separately
	  for (const agreement of mappedData) {
		const response = await axios.post('http://localhost:8080/api/provider/create-offer', agreement);
		console.log("Insert API Response: ", response.data);
  
		if (response.data.success) {
		  alert('Data successfully inserted into your table!');
		} else {
		  alert('Failed to insert data: ' + response.data.message);
		}
	  }
	} catch (err) {
	  console.error('Error while inserting data:', err);
	  alert('An error occurred while inserting data.');
	}
  };

  useEffect(() => {
    if (selectedSection === 'userManagement') {
      fetchData('https://api.example.com/user-management');
    } else if (selectedSection === 'serviceAgreements') {
      fetchData('https://api.example.com/service-agreements');
    } else if (selectedSection === 'masterAgreement') {
      fetchData('https://agiledev-contractandprovidermana-production.up.railway.app/master-agreements/all-open-agreements');
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
        roleName: bidForm.role.roleName,
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
