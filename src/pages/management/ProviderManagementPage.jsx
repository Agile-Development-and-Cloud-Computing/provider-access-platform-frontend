// File: src/pages/management/ProviderManagementPage.jsx
import React, { useState, useEffect } from 'react';
import AdminDashboardNavbar from '@/components/AdminDashboardNavbar';
import Footer from '@/components/Footer';
//import '@/styles/ProviderManagementPage.css';

const ProviderManagementPage = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/providers'); // Replace with your API endpoint
        const data = await response.json();
        setProviders(data);
      } catch (err) {
        console.error('Error fetching providers:', err);
        setError('Failed to load providers.');
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading providers...</p>
      </div>
    );
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <AdminDashboardNavbar />
      <div className="provider-management-container">
        <h1>Provider Management</h1>
        <table className="provider-table">
          <thead>
            <tr>
              <th>Provider ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr key={provider.id}>
                <td>{provider.id}</td>
                <td>{provider.name}</td>
                <td>{provider.email}</td>
                <td>
                  <button onClick={() => console.log(`View ${provider.id}`)}>View</button>
                  <button onClick={() => console.log(`Edit ${provider.id}`)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default ProviderManagementPage;
