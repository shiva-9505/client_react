import React from 'react'
import TopBar from '../components/TopBar'
import ItemsDisplay from '../components/ItemsDisplay'
import Chains from '../components/Chains'
import FirmCollection from '../components/FirmCollection'
import ProductMenu from '../components/ProductMenu'

const LandingPage = () => {
  return (
    <div>
      <TopBar/>
      <div className="landingSection">
        <ItemsDisplay/>
        <Chains/>
        <FirmCollection/>
      </div>
      
    </div>
  )
}

export default LandingPage
