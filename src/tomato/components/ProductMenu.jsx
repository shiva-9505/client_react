import React, { useEffect, useState } from 'react'
import { API_URL } from '../api';
import { useParams } from 'react-router-dom';
import TopBar from './TopBar'
const ProductMenu = () => {
    const [products, setProducts] = useState([]);

    const { firmId } = useParams()
    const {firmName}=useParams()

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

    return (
        <>
            <TopBar />
            <section className="productSection">
                <h3>{firmName}</h3>
                {products.map((item) => {
                    return (
                        <div className='productBox'>
                            <div>
                                <div><strong>{item.productName}</strong></div>
                                <div>₹{item.price}</div>
                                <div>{item.description}</div>
                            </div>
                            <div className="productGroup">
                                <img src={item.image} alt={item.productName} />
                                <div className="addButton">ADD</div>
                            </div>
                        </div>
                    )
                })}
            </section>
        </>
    )
}

export default ProductMenu
