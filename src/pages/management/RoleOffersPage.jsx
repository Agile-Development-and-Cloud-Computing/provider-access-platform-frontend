import React, { useEffect, useState } from 'react';
import '@/styles/cards/RoleOffersPage.css';

const RoleOffersPage = () => {
  const [roleOffers, setRoleOffers] = useState([]);

  useEffect(() => {
    // Fetch role offers from the API or mock data
    const fetchRoleOffers = async () => {
      const response = await fetch('/api/role-offers'); // Replace with your API endpoint
      const data = await response.json();
      setRoleOffers(data);
    };

    fetchRoleOffers();
  }, []);

  return (
    <div className="role-offers-page">
      <h1>Role Offers</h1>
      <table className="role-offers-table">
        <thead>
          <tr>
            <th>Offer ID</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roleOffers.map((offer) => (
            <tr key={offer.id}>
              <td>{offer.id}</td>
              <td>{offer.description}</td>
              <td>{offer.status}</td>
              <td>
                <button onClick={() => console.log(`View ${offer.id}`)}>View</button>
                <button onClick={() => console.log(`Edit ${offer.id}`)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleOffersPage;
