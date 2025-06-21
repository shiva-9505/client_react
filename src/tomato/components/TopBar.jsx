import React from 'react'

const TopBar = () => {
  return (
   <section className="topBarSection">
        <div className="companyTitle">
            <h2>Tomato</h2>
        </div>
        <div className="searchBar">
            <input type="text" placeholder='Search....' />
        </div>
        <div className="userAuth">
            LogIn/Signup
        </div>
   </section>
  )
}

export default TopBar
