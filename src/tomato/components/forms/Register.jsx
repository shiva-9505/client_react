import React from 'react'

const Register = () => {

  return (
    <div className='registrationSection'>
      
      <form action="" className='authForm'>
        <h2>Sign Up</h2>
        <h6>or login to your account </h6>
        <img src="image.jpeg" alt="" />
        <input type="tel" required maxLength="10" placeholder='Phone Number' />
        <input type="text" required placeholder='Name' />
        <input type="email" required placeholder='Email' />
        <h6>Have a referral code?</h6>
        <button>CONTINUE</button>
        <label>By creating an account, I accept the <strong>Terms & conditions & Privacy policy</strong></label>

      </form>
      
    </div>
  )
}

export default Register
