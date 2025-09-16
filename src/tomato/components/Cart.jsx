import React, { useState, useEffect } from 'react';
import { API_URL } from '../api';
import {Link} from 'react-router-dom';
import TopBar from './TopBar';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState({ name: '', email: '', mobile: '' });


    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemsWithQty = items.map(item => ({
            ...item,
            quantity: Number(item.quantity || 1),
            price: Number(item.price)    // ✅ force price to be number
        }));
        setCartItems(itemsWithQty);
    }, []);



    const updatedQuantity = (index, type) => {
        const updated = [...cartItems];
        if (type === 'inc') {
            updated[index].quantity += 1;
        } else if (type === 'dec') {
            updated[index].quantity -= 1;
            if (updated[index].quantity <= 0) {
                updated.splice(index, 1); // remove item
            }
        }
        setCartItems(updated);
        localStorage.setItem('cartItems', JSON.stringify(updated));
    };


    const getTotalAmount = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };


    const placeOrder = async () => {
        console.log("sending order wih items", cartItems)
        if (!user.name || !user.email || !user.mobile) {
            alert("Please fill all user details");
            return;
        }
        const firmId = cartItems[0]?.firmId;
        try {
            const response = await fetch(`${API_URL}/order/place-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user,
                    firmId,
                    items: cartItems
                })
            });
            const data = await response.json();
            if (response.ok) {
                // alert(`Order placed Order ID: ${data.orderId}`);
                localStorage.removeItem('cartItems');
                localStorage.setItem('last_order_id', data.orderId);
                localStorage.setItem('customOrderId',data.customOrderId);
                setCartItems([]);
                setUser({ name: '', email: '', mobile: '' });
                // window.location.href = '/order-success';
                window.location.href = '/order-status';

            } else {
                alert(data.message || "Failed to place order");
            }

        } catch (error) {
            alert('Error while placing order', error);
            console.log(error)
        }
    };

    return (
        <>
        <TopBar/>
        <div className="cartSection">
            <h3>Your Cart</h3>
            {cartItems.length === 0 ? (
                <>
                    <p>No Items in cart..!</p>
                    <Link to="/" className="backBtn">← Back to Home</Link>
                </>
            ) : (
                <>
                    {cartItems.map((item, index) => (
                        < div className="cartItemBox" key={index} >
                            <div>
                                <strong>{item.productName}</strong><br />₹{item.price}
                            </div>
                            <div>
                                <img src={item.image} alt={item.productName} width="100px" height="80px" />
                            </div>
                            <div>
                                Quantity:
                                <button onClick={() => updatedQuantity(index, 'dec')}>-</button>
                                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                                <button onClick={() => updatedQuantity(index, 'inc')}>+</button>
                            </div>
                        </div>
                    ))}
                    <h4>Total: ₹{getTotalAmount()} </h4>
                    <h5>Enter your details to place order</h5>
                    <input type="text" placeholder='Name' value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    <input type="email" placeholder='Email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    <input type="tel" placeholder='Mobile' value={user.mobile} onChange={(e) => setUser({ ...user, mobile: e.target.value })} maxLength={10} />
                    <button onClick={placeOrder}>Place Order</button>
                </>
            )}
        </div>
    </>
    );
};

export default Cart;
