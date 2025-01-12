import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProviderAdminNavbar from '../../components/ProviderAdminNavbar';
import Footer from '../../components/Footer';
import '../../styles/UserManagement.css'; // Add styles for this component

const UserManagement = () => {
  const [users, setUsers] = useState([]); // Holds the list of users
  const [newUser, setNewUser] = useState({ username: '', role: '' }); // Form data for a new user
  const [error, setError] = useState(null); // Error messages
  const [loading, setLoading] = useState(false); // Loading state

  const apiUrl = 'http://localhost:5000/api/users'; // Base URL for the mock server

  // Fetch existing users from the server when the component loads
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(apiUrl);
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle input change for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  // Add a new user
  const handleAddUser = async () => {
    setError(null); // Clear previous errors

    // Validation
    if (!newUser.username || !newUser.role) {
      setError('Both username and role are required.');
      return;
    }

    if (users.length >= 2) {
      setError('You can only add up to 2 users.');
      return;
    }

    try {
      const response = await axios.post(apiUrl, newUser);
      setUsers([...users, response.data]); // Update the list of users
      setNewUser({ username: '', role: '' }); // Clear the form
    } catch (err) {
      setError('Failed to add user. Please try again.');
    }
  };

  // Delete a user
  const handleDeleteUser = async (id) => {
    setError(null); // Clear previous errors

    try {
      await axios.delete(`${apiUrl}/${id}`);
      setUsers(users.filter((user) => user.id !== id)); // Update the list of users
    } catch (err) {
      setError('Failed to delete user. Please try again.');
    }
  };

  return (
    <>
      <ProviderAdminNavbar />
      <div className="user-management-container">
        <h1>User Management</h1>
        {error && <p className="error-message">{error}</p>}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* Existing Users */}
            <div className="users-list">
              <h2>Existing Users</h2>
              {users.length > 0 ? (
                users.map((user) => (
                  <div key={user.id} className="user-card">
                    <p>
                      <strong>Username:</strong> {user.username}
                    </p>
                    <p>
                      <strong>Role:</strong> {user.role}
                    </p>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p>No users available.</p>
              )}
            </div>

            {/* Add New User Form */}
            <div className="add-user-form">
              <h2>Add New User</h2>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Role:
                <input
                  type="text"
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                />
              </label>
              <button onClick={handleAddUser}>Add User</button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserManagement;
