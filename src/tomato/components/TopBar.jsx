import React from 'react'
import { Link } from 'react-router-dom'

const TopBar = ({showRegisterHandler}) => {
  return (
   <section className="topBarSection">
        <div className="companyTitle">
            <Link to='/' className='link'>
                <h2>HUNGRYPLATE</h2>
            </Link>
        </div>
        <div className="searchBar">
            <input type="text" placeholder='Search....' />
        </div>
        <div className="userAuth">
            <span >LogIn</span>
            <span onClick={showRegisterHandler}> /SignUp</span>
        </div>
   </section>
  )
}

export default TopBar
