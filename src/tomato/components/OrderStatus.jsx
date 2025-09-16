import React, { useEffect, useState } from 'react';
import { API_URL } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import TopBar from './TopBar';

const OrderStatus = () => {
  const [status, setStatus] = useState('');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const orderId = localStorage.getItem('last_order_id');
  const navigate = useNavigate();

  useEffect(() => {
    let interval;

    const fetchStatus = async () => {
      try {
        const res = await fetch(`${API_URL}/order/status/${orderId}`);
        const data = await res.json();
        console.log("API response", data);

        if (res.ok) {
          setStatus(data.status);
          setUser(data.user);

          // if order is accepted, redirect after 2s and stop polling
          if (data.status === "Accepted") {
            clearInterval(interval);
            setTimeout(() => {
              navigate('/order-success');
            }, 2000);
          }
        } else {
          setStatus("Unknown");
        }
      } catch (err) {
        setStatus("Error");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchStatus();
      interval = setInterval(fetchStatus, 3000);
    }

    return () => clearInterval(interval);
  }, [orderId, navigate]);

  if (loading) return <p style={{ textAlign: 'center' }}>⏳ Loading order status...</p>;

  return (
    <>
    <TopBar/>
      <div className="orderStatusSection">
      <h2>Order Status</h2>
      <p><strong>Customer:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <hr />
      {status === 'Placed' && (
        <p style={{ color: 'gray' }}>⏳ Your order is placed and waiting for confirmation.</p>
      )}
      {status === 'Accepted' && (
        <p style={{ color: 'green' }}>✅ Your order has been accepted! Redirecting...</p>
      )}
      {status === 'Out for Delivery' && (
        <p style={{ color: 'orange' }}>🚚 Your order is out for delivery.</p>
      )}
      {status === 'Declined' && (
        <>
        <p style={{ color: 'red' }}>
          ❌ Sorry! Your order was declined. Please try ordering from another restaurant.
        </p>
        <Link to="/" className="backBtn">← Back to Home</Link>
        </>
      )}
      {status === 'Unknown' && <p>⚠️ Order not found.</p>}
      {status === 'Error' && <p>❌ Failed to fetch order status.</p>}
    </div>
    </>
  );
};

export default OrderStatus;
