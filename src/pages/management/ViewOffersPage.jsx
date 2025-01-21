// src/pages/management/ViewOffersPage.jsx
import React, { useState, useEffect } from 'react';
import UserDashboardNavbar from '@/components/UserDashboardNavbar';
import Footer from '@/components/Footer';
import offerService from '@/services/offerService';
import '@/styles/ViewOffersPage.css';

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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
      <UserDashboardNavbar />
      <div className="view-offers-container">
        <h1>View Offers</h1>
        <ul className="offers-list">
          {offers.map((offer) => (
            <li key={offer.id} className="offer-item">
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <p><strong>Max Bid:</strong> ${offer.maxBid}</p>
              <p><strong>Deadline:</strong> {offer.deadline}</p>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default ViewOffersPage;
