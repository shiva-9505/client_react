import React, { useState } from 'react'
import TopBar from '../components/TopBar'
import ItemsDisplay from '../components/ItemsDisplay'
import Chains from '../components/Chains'
import FirmCollection from '../components/FirmCollection'
import ProductMenu from '../components/ProductMenu'
import Register from '../components/forms/Register'


const LandingPage = () => {
  const [showLogin,setShowLogin]=useState(false);
  const [showRegister,setShowRegister]=useState(false);
  const [showAll,setShowAll]=useState(true);

  const showRegisterHandler=()=>{
      setShowRegister(true)
      setShowAll(false)
  }
  return (
    <div>
      <TopBar showRegisterHandler={showRegisterHandler}/>
      <div className="landingSection">
        {showAll && <ItemsDisplay/>}
        {showAll && <Chains/>}
        {showAll && <FirmCollection/>}
        {showRegister && <Register/>}
      </div>
      
    </div>
  )
}

export default LandingPage
