// src/components/dashboard/BidForm.jsx
import React, { useState } from 'react';
import bidService from '../../services/bidService';

const BidForm = ({ role, domain, agreement, onClose }) => {
  const [formData, setFormData] = useState({ providerName: '', bidPrice: '' });
  const [formError, setFormError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bidService.submitBid({ ...formData, role, domain, agreement });
      alert('Bid submitted successfully!');
      onClose();
    } catch (err) {
      setFormError('Failed to submit bid.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Place Your Bid for {role.roleName}</h2>
      <label>
        Provider Name:
        <input
          type="text"
          name="providerName"
          value={formData.providerName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Bid Price:
        <input
          type="number"
          name="bidPrice"
          value={formData.bidPrice}
          onChange={handleInputChange}
        />
      </label>
      {formError && <p style={{ color: 'red' }}>{formError}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default BidForm;

