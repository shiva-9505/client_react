import React, { useState } from 'react'
import TopBar from '../components/TopBar'
import ItemsDisplay from '../components/ItemsDisplay'
import Chains from '../components/Chains'
import FirmCollection from '../components/FirmCollection'
import ProductMenu from '../components/ProductMenu'
import Register from '../components/forms/Register'
import Login from '../components/forms/Login'


const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user_token'));
  const [searchQuery, setSearchQuery] = useState("");


  const showRegisterHandler = () => {
    setShowRegister(true)
    setShowAll(false)
    setShowLogin(false)
    setShowLogout(false)
  }
  const showLoginHandler = () => {
    setShowRegister(false)
    setShowAll(false)
    setShowLogin(true)
    setShowLogout(false)
  }
  const showLogoutHandler = () => {
    const confirmLogout=window.confirm("Are you sure you want to Logout??");
    if(!confirmLogout){
      return;
    }
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_email');
    
    setIsLoggedIn(false);
    setShowRegister(false);
    setShowAll(true);
    setShowLogin(false);
    setShowLogout(false);
  }

  return (
    <div>
      <TopBar showRegisterHandler={showRegisterHandler} showLoginHandler={showLoginHandler} 
      showLogoutHandler={showLogoutHandler} isLoggedIn={isLoggedIn} 
      searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <div className="landingSection">
        {showAll && <ItemsDisplay searchQuery={searchQuery}/>}
        {showAll && <Chains />}
        {showAll && <FirmCollection searchQuery={searchQuery}/>}
        {showRegister && <Register showLoginHandler={showLoginHandler} />}
        {showLogin && <Login showLogoutHandler={showLogoutHandler} setIsLoggedIn={setIsLoggedIn} />}

        {/* <Register /> */}
      </div>

    </div>
  )
}

export default LandingPage
