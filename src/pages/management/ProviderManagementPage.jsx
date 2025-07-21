import React, { useState, useEffect } from 'react';
import AdminDashboardNavbar from '@/components/AdminDashboardNavbar';
import Footer from '@/components/Footer';
import '@/styles/ProviderManagementPage.css';

const ProviderManagementPage = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProvider, setEditingProvider] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    providerName: '',
  });

  // Fetch the list of providers from the external API
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        console.log('Fetching providers...');
        const response = await fetch(`https://access-platform.azurewebsites.net/api/provider/get-user`);
        const responseData = await response.json();
        
        console.log('Response from API:', responseData);

        // Check if the response contains a `data` field
        if (responseData.success && Array.isArray(responseData.data)) {
          // Filter to show only providers with role "User"
          const filteredProviders = responseData.data.filter(provider => provider.user_type === 'User');
          setProviders(filteredProviders);
          console.log('Filtered Providers:', filteredProviders);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        console.error('Error fetching providers:', err);
        setError('Failed to load providers.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProviders();
  }, []);

  // Handle the edit action
  const handleEdit = (provider) => {
    console.log('Editing provider:', provider);
    setFormData({
      username: provider.username,
      password: provider.password,
      email: provider.email, // Adjusted field name to match API response
      providerName: provider.provider_name, // Adjusted field name
    });
    setEditingProvider(provider.provider_id); // Adjusted field name to provider_id
  };

  // Handle saving the updated provider data
  const handleSave = async () => {
    console.log('Saving provider data:', formData);
    try {
      const response = await fetch(`https://access-platform.azurewebsites.net/api/provider/edit-credentials`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          providerId: editingProvider,
          newProviderName: formData.providerName,
          newEmail: formData.email,
          newPassword: formData.password,
          newUsername: formData.username,
        }),
      });
  
      const data = await response.json();
      console.log('Response after saving:', data);
  
      if (data.success) {
        // Reset editing state and clear the form
        setEditingProvider(null);
        setFormData({
          username: '',
          password: '',
          email: '',
          providerName: '',
        });
  
        // Update the local providers state
        setProviders((prevProviders) =>
          prevProviders.map((provider) =>
            provider.provider_id === editingProvider
              ? {
                  ...provider,
                  provider_name: formData.providerName, // Ensure correct name field is updated
                  username: formData.username,
                  email: formData.email,
                }
              : provider
          )
        );
        console.log('Updated Providers List:', providers);
      } else {
        console.error('Failed to update provider:', data.message);
      }
    } catch (err) {
      console.error('Error saving provider data:', err);
    }
  };
  


  if (loading) {
    return <div className="loading-container"><p>Loading providers...</p></div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <div className="provider-management-container">
  <h1>Provider Management</h1>
  <table className="provider-table">
    <thead>
      <tr>
        <th>Provider ID</th>
        <th>Name</th>
        <th>Username</th> {/* Added column for Username */}
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {providers.map((provider) => (
        <tr key={provider.provider_id}> {/* Using provider_id as the unique key */}
          <td>{provider.provider_id}</td>
          <td>{provider.provider_name}</td>
          <td>{provider.username}</td> {/* Displaying Username here */}
          <td>{provider.email}</td>
          <td>
            {editingProvider === provider.provider_id ? (
              <span>Editing...</span>
            ) : (
              <button onClick={() => handleEdit(provider)}>Edit</button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* Show Edit Form when the provider is being edited */}
{editingProvider && (
  <div className="edit-form-container">
    <h2>Edit Provider - {formData.providerName}</h2> {/* Displaying the provider's name */}    
    {/* Username Field */}
    <label htmlFor="username">Username</label>
    <input
      id="username"
      type="text"
      placeholder="Username"
      value={formData.username}
      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
    />

    {/* Password Field */}
    <label htmlFor="password">Password</label>
    <input
      id="password"
      type="password"
      placeholder="Password"
      value={formData.password}
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    />

    {/* Email Field */}
    <label htmlFor="email">Email</label>
    <input
      id="email"
      type="email"
      placeholder="Email"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    />

    {/* Provider Name Field */}
    <label htmlFor="providerName">Provider Name</label>
    <input
      id="providerName"
      type="text"
      placeholder="Provider Name"
      value={formData.providerName}
      onChange={(e) => setFormData({ ...formData, providerName: e.target.value })}
    />

    <button onClick={handleSave}>Save Changes</button>
  </div>
)}

    </div>
  );
};

export default ProviderManagementPage;
