import React from 'react'
import { Link } from 'react-router-dom'

const TopBar = ({ showRegisterHandler, showLoginHandler, showLogoutHandler, isLoggedIn}) => {
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
                {!isLoggedIn ?
                (
                <>
                <span onClick={showLoginHandler} >LogIn</span>
                <span onClick={showRegisterHandler}> /SignUp</span>
                </>
                ):( <span onClick={showLogoutHandler}>LogOut</span>)
        }   
            </div>
        </section>
    )
}

export default TopBar
