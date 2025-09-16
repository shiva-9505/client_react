import React, { useEffect, useState } from 'react'
import { API_URL } from '../api';
import { useParams } from 'react-router-dom';
import TopBar from './TopBar'



const ProductMenu = () => {
    const [products, setProducts] = useState([]);

    const { firmId } = useParams()
    const { firmName } = useParams()

    const productHandle = async () => {
        try {
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductData = await response.json()
            setProducts(newProductData.products)
            // console.log(newProductData);

        } catch (error) {
            console.log("products failed to fetch", error)
        }
    }

    useEffect(() => {
        productHandle()
    }, [])

    const addToCart = (product) => {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const existing = cartItems.find(
            (item) => item.productName === product.productName && item.firmId === firmId
        );
        if (existing) {
            existing.quantity += 1;
        } else {
            cartItems.push({
                firmId,
                productName: product.productName,
                price: product.price,
                quantity: 1,
                image: product.image,
                _id: product._id
            });
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        alert(`${product.productName} added to cart`);
    };


    return (
        <>
            <TopBar />
            <section className="productSection">
                <h3>{firmName}</h3>
                {products.map((item) => {
                    return (
                        <div className='productBox' key={item._id}>
                            <div>
                                <div><strong>{item.productName}</strong></div>
                                <div>₹{item.price}</div>
                                <div>{item.description}</div>
                            </div>
                            <div className="productGroup">
                                <img src={item.image} alt={item.productName} />
                                <div className="addButton" onClick={() => addToCart(item)}>ADD</div>
                            </div>
                        </div>
                    )
                })}
            </section>
        </>
    )
}

export default ProductMenu
