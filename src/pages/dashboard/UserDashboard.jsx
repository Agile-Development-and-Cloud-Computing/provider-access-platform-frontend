import React, { useState, useEffect } from 'react';
import UserDashboardNavbar from '../../components/UserDashboardNavbar';
import KPISection from '../../components/dashboard/KPISection';
import DomainDetails from '../../components/dashboard/DomainDetails';
import BidFormModal from '../../components/dashboard/BidFormModal';
import Footer from '../../components/Footer';
import { fetchMasterAgreements, placeBid } from '../../services/dashboardService';
import '../../styles/Dashboard.css';

const UserDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('masterAgreement');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [bidForm, setBidForm] = useState({ visible: false, role: null, domain: null });

  // Fetch Data based on selectedSection
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchMasterAgreements(); // Use service
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    if (selectedSection === 'masterAgreement') {
      fetchData();
    }
  }, [selectedSection]);

  const handleToggleDetails = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handlePlaceBid = async (bidData) => {
    try {
      await placeBid(bidData); // Use service
      alert('Bid successfully placed!');
    } catch (err) {
      console.error('Failed to place bid:', err);
      alert('Failed to place bid. Please try again.');
    } finally {
      setBidForm({ visible: false, role: null, domain: null });
    }
  };

  return (
    <div className="dashboard-wrapper">
      <UserDashboardNavbar onSelectSection={setSelectedSection} />
      <div className="dashboard-container">
        <h1>Welcome to Your Dashboard</h1>

        {/* KPI Section */}
        <KPISection />

        {/* Render Domain Details */}
        <DomainDetails
          data={data}
          loading={loading}
          error={error}
          expanded={expanded}
          onToggleDetails={handleToggleDetails}
          onBidClick={setBidForm}
        />

        {/* Bid Modal */}
        {bidForm.visible && (
          <BidFormModal
            bidForm={bidForm}
            onSubmit={handlePlaceBid}
            onClose={() => setBidForm({ visible: false, role: null, domain: null })}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
