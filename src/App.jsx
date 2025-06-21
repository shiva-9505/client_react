import React from 'react'
import './App.css'
import LandingPage from './tomato/pages/LandingPage'
import {Routes,Route} from 'react-router-dom'
import ProductMenu from './tomato/components/ProductMenu'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element= { <LandingPage/> }/>
        <Route path='/products/:firmId/:firmName' element={<ProductMenu/>}/>
      </Routes>
    </div>
  )
}

export default App
