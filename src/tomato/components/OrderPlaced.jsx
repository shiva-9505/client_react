import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../api';
import TopBar from './TopBar';


const OrderPlaced = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [cOrderId,setcOrderId]=useState('');

  useEffect(() => {
    const storedOrderId = localStorage.getItem('last_order_id');
    const customOrder=localStorage.getItem('customOrderId');
    if (storedOrderId) {
      setOrderId(storedOrderId);
      setcOrderId(customOrder);
      // localStorage.removeItem('last_order_id');
    }
  }, []);

  useEffect(() => {
    if (!orderId) return;

    let intervalId;

    const checkStatus = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/order/status/${orderId}`);
        const data = await response.json();
        if (response.ok) {
          
          const newStatus = data.status;
          setStatus(newStatus);

          if (newStatus === 'Out for Delivery') {
            clearInterval(intervalId);
          }
          if(newStatus === 'Delivered'){
            localStorage.removeItem('loginToken');
            localStorage.removeItem('firmId');
            localStorage.removeItem('customOrderId');
            localStorage.removeItem('firmName');
            localStorage.removeItem('last_order_id');
          }
        } else {
          setStatus('Error');
        }
      } catch (error) {
        console.error('Error fetching status:', error);
        setStatus('Error');
      } finally {
        setLoading(false);
      }
    };

    checkStatus();

    intervalId = setInterval(checkStatus, 3000);
    return () => clearInterval(intervalId);
  }, [orderId]);
  // const trackStatus = async () => {
  //   if (!orderId) return;
  //   try {
  //     const response = await fetch(`${API_URL}/order/status/${orderId}`);
  //     const data = await response.json();

  //     if (response.ok) {
  //       const currentStatus=data.status;
  //       // if (data.status === 'Accepted') {
  //       //   setStatus('Accepted');
  //       // } else if (data.status === 'Out for Delivery') {
  //       //   setStatus('Out for Delivery');
  //       // } else {
  //       //   setStatus('Pending');
  //       // }
  //       if(['Accepted','Out for Delivery','Pending'].includes(currentStatus)){
  //         setStatus(currentStatus);
  //       }else{
  //         setStatus('Pending');
  //       }
  //     }else{
  //       setStatus('Error')
  //     }
  //   } catch (error) {
  //     setStatus('Error');
  //     console.log(error);
  //   }finally{
  //     setLoading(false);
  //   }
  // };
  // const handleManualCheck=()=>{
  //   setLoading(true);
  //   trackStatus();
  // };

  return (
    <>
    <TopBar/>
      <div className="orderSuccessPage">
        <div className="orderCard">
          <h2>🎉 Order Placed Successfully!</h2>
          <p>Your order ID is:</p>
          <h4>{cOrderId}</h4>
          {status === 'Accepted' && <p>We’re preparing your delicious food. Sit tight!</p>}
          {status === 'Out for Delivery' && <p>Your Order is out for delivery.</p>}
          {status === 'Pending' && <p>Your order is being processed...</p>}
          {status === 'Delivered' && <p>Your Order is delivered..! Thank you for your order <strong>Visit Again</strong></p>}
          {status === 'Error' && <p>There was a problem fetching order status.</p>}
          <Link to="/" className="backBtn">← Back to Home</Link>
        </div>
      </div>
    </>
  );
};

export default OrderPlaced;
