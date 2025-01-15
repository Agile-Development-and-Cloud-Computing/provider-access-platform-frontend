import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import AdminDashboardNavbar from '../../components/AdminDashboardNavbar'; // Import ProviderAdminNavbar
import Footer from '../../components/Footer';
import { Modal, Button } from 'react-bootstrap';
import '../../styles/MasterAgreementPage.css';
import masterAgreementService from '../../services/masterAgreementService'; // Import centralized service

const MasterAgreementPage = () => {
  const [agreements, setAgreements] = useState([]);
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [bidForm, setBidForm] = useState({ visible: false, role: null, domain: null });
  const [formData, setFormData] = useState({ providerName: '', bidPrice: '' });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchMasterAgreements();
  }, []);

  const fetchMasterAgreements = async () => {
    try {
      const response = await masterAgreementService.getMasterAgreements();
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
       setData(transformedData); // Fetch agreements via service
      setAgreements(transformedData);
    }
  }catch (err) {
    console.error("Error fetching data:", err);
   setError("Failed to fetch data.");
    } finally {
   setLoading(false);
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

      console.log("API Response: ", response.data);

      if (response.data.success === false) {
        setFormError(response.data.message || 'Failed to place bid. Please contact admin.');
        return;
      }

      alert('Bid successfully placed!');
      setBidForm({ visible: false, role: null, domain: null });
    } catch (err) {
      console.error('Failed to submit bid:', err);
      setFormError('Failed to submit bid. Please try again.');
    }
  };


  const handleShowDetails = (agreement) => {
    setSelectedAgreement(agreement);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedAgreement(null);
  };

  const columns = [
    { name: 'ID', selector: (row) => row.masterAgreementID, sortable: true },
    { name: 'Name', selector: (row) => row.name, sortable: true },
    { name: 'Provider', selector: (row) => row.provider.providerName, sortable: true },
    { name: 'Domain', selector: (row) => row.domain, sortable: true },
    { name: 'Status', selector: (row) => row.status, sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <Button variant="info" onClick={() => handleShowDetails(row)}>
          Details
        </Button>
      ),
    },
  ];

  return (
    <>
      <AdminDashboardNavbar /> {/* Use AdminDashboardNavbar */}
      <div className="master-agreement-container">
        <h1>Master Agreements</h1>
        <div className="table-container">
          <DataTable columns={columns} data={agreements} pagination highlightOnHover />
        </div>

        {/* Details Modal */}
        {selectedAgreement && (
          <Modal show={showDetailsModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Master Agreement Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p><strong>ID:</strong> {selectedAgreement.masterAgreementID}</p>
              <p><strong>Name:</strong> {selectedAgreement.name}</p>
              <p><strong>Provider:</strong> {selectedAgreement.provider.providerName}</p>
              <p><strong>Valid From:</strong> {selectedAgreement.validFrom}</p>
              <p><strong>Valid Until:</strong> {selectedAgreement.validUntil}</p>
              <p><strong>Domain:</strong> {selectedAgreement.domain}</p>
              <p><strong>Roles:</strong> {selectedAgreement.roles.join(', ')}</p>
              <p><strong>Experience Level:</strong> {selectedAgreement.experienceLevel}</p>
              <p><strong>Man-Days:</strong> {selectedAgreement.manDays}</p>
              <p><strong>Daily Rate:</strong> {selectedAgreement.dailyRate}</p>
              <p><strong>Total Budget:</strong> {selectedAgreement.totalBudget}</p>
              <p><strong>Status:</strong> {selectedAgreement.status}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MasterAgreementPage;
