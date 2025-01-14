import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import ProviderAdminNavbar from '../../components/AdminDashboardNavbar'; // Import ProviderAdminNavbar
import Footer from '../../components/Footer';
import { Modal, Button } from 'react-bootstrap';
import '../../styles/MasterAgreementPage.css';
import masterAgreementService from '../../services/masterAgreementService'; // Import centralized service

const MasterAgreementPage = () => {
  const [agreements, setAgreements] = useState([]);
  const [selectedAgreement, setSelectedAgreement] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchMasterAgreements();
  }, []);

  const fetchMasterAgreements = async () => {
    try {
      const response = await masterAgreementService.getMasterAgreements(); // Fetch agreements via service
      setAgreements(response.data);
    } catch (error) {
      console.error('Error fetching master agreements:', error);
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
      <ProviderAdminNavbar /> {/* Use ProviderAdminNavbar */}
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
