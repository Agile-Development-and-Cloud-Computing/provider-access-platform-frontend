// File: src/components/kpiCards/KpiSection.jsx
import React, { useState, useEffect } from 'react';
import '@/styles/kpiCards/KpiSection.css'; 

const KpiSection = () => {
  // State to store KPI data
  const [kpis, setKpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data to use if API fetch fails
  const mockKpis = [
    { title: 'Total Service Requests', value: 5 },
    { title: 'Orders in Progress', value: 2 },
    { title: 'Pending Offers', value: 3 },
  ];

  useEffect(() => {
    const fetchKpis = async () => {
      try {
        setLoading(true);

        // Actual API endpoint URL
        const response = await fetch('/api/kpis'); //actual API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Update state with API data
        setKpis(data);
      } catch (err) {
        console.error('Error fetching KPI data:', err);
        setError('Unable to fetch KPI data. Falling back to mock values.');
        
        // Fallback to mock data if there's an error
        setKpis(mockKpis);
      } finally {
        setLoading(false); // Ensure loading state is stopped
      }
    };

    fetchKpis(); // Fetch data on component mount
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return <p>Loading KPIs...</p>; // Show loading state while data is being fetched
  }

  if (error) {
    console.warn(error); // Log the error message (optional)
  }

  return (
    <div className="kpi-section">
      <h2 className="kpi-title" role="heading" aria-level="2">Service Overview</h2>
      <div className="kpi-grid">
        {kpis.map((kpi, index) => (
          <div key={index} className="kpi-card">
            <h3 className="kpi-card-title">{kpi.title}</h3>
            <p className="kpi-card-value">{kpi.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KpiSection;
