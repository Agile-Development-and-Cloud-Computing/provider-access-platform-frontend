// File: src/pages/management/OrderPage.jsx
import React, { useEffect, useState } from 'react';
import '@/styles/cards/OrdersPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the API or mock data
    const fetchOrders = async () => {
      const response = await fetch('/api/orders'); // Replace with your API endpoint
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h1>Orders</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.description}</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => console.log(`View ${order.id}`)}>View</button>
                <button onClick={() => console.log(`Update ${order.id}`)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
