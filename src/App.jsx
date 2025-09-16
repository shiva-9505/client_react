import React from 'react'
import './App.css'
import LandingPage from './tomato/pages/LandingPage'
import { Routes, Route } from 'react-router-dom'
import ProductMenu from './tomato/components/ProductMenu'
import Cart from './tomato/components/Cart'
import OrderPlaced from './tomato/components/OrderPlaced'
import OrderStatus from './tomato/components/OrderStatus'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/products/:firmId/:firmName' element={<ProductMenu />} />

        <Route path='/cart' element={<Cart />} />
        <Route path='/order-success' element={<OrderPlaced/>}/>
        <Route path='/order-status' element={<OrderStatus/>}/>
      </Routes>
    </div>
  );
};

export default App;
