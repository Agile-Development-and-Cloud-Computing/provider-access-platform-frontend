import React, { useState } from 'react';

const BidFormModal = ({ bidForm, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({ providerName: '', bidPrice: '' });
  const [formError, setFormError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { providerName, bidPrice } = formData;

    if (!providerName || !bidPrice) {
      setFormError('All fields are required.');
      return;
    }
    onSubmit({ ...bidForm, providerName, bidPrice: parseFloat(bidPrice) });
  };

  return (
    <div className="bid-form-modal">
      <form onSubmit={handleSubmit}>
        <h2>Place Your Bid</h2>
        <input
          type="text"
          name="providerName"
          value={formData.providerName}
          onChange={handleInputChange}
          placeholder="Provider Name"
          required
        />
        <input
          type="number"
          name="bidPrice"
          value={formData.bidPrice}
          onChange={handleInputChange}
          placeholder="Bid Price"
          required
        />
        {formError && <p style={{ color: 'red' }}>{formError}</p>}
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default BidFormModal;
