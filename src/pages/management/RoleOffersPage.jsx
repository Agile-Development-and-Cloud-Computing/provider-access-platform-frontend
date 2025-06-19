import React, { useEffect, useState } from 'react';
import '@/styles/cards/RoleOffersPage.css';

const RoleOffersPage = () => {
  const [roleOffers, setRoleOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRoleOffers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/provider/role-offers');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          // Flatten the structure for table rendering
          const flattened = result.data.flatMap((role) =>
            role.providers.map((provider) => ({
              offerId: provider.offerId,
              roleName: role.roleName,
              domainName: role.domainName,
              experienceLevel: role.experienceLevel,
              providerName: provider.providerName,
              bidPrice: provider.bidPrice,
              quotePrice: provider.quotePrice,
            }))
          );
          setRoleOffers(flattened);
        } else {
          setError('Unexpected data format from server');
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoleOffers();
  }, []);

  if (loading) return <div>Loading role offers...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="role-offers-page">
      <h1>Role Offers</h1>
      <table className="role-offers-table">
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Domain</th>
            <th>Experience</th>
            <th>Provider</th>
            <th>Quote Price</th>
            <th>Bid Price</th>
          </tr>
        </thead>
        <tbody>
          {roleOffers.map((offer) => (
            <tr key={offer.offerId}>
              <td>{offer.roleName}</td>
              <td>{offer.domainName}</td>
              <td>{offer.experienceLevel}</td>
              <td>{offer.providerName}</td>
              <td>{offer.quotePrice}</td>
              <td>{offer.bidPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleOffersPage;
