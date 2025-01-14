// src/pages/management/ViewOffersPage.jsx

import React, { useState, useEffect } from 'react';
import offerService from '../../services/offerService';

const ViewOffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await offerService.getOffers();
        setOffers(data);
      } catch (err) {
        setError('Failed to fetch offers.');
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>View Offers</h1>
      <ul>
        {offers.map((offer) => (
          <li key={offer.id}>
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
            <p><strong>Max Bid:</strong> ${offer.maxBid}</p>
            <p><strong>Deadline:</strong> {offer.deadline}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewOffersPage;
