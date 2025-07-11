import React,{useState} from 'react'
import { API_URL } from '../../api';

const Register = ({showLoginHandler}) => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [mobile,setMobile]=useState("");
  const [error,setError]=useState("");


  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response=await fetch(`${API_URL}/user/userregister`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({name,email,mobile})
      })
      const data=await response.json();
      if(response.ok){
        console.log(data);
        setName("");
        setEmail("");
        setMobile("");
        alert("User Successfully registered");
        showLoginHandler();
      }else{
        setError(data.error);
        alert(data.message || "Something went wrong");
      }

    } catch (error) {
      console.log("registration failed", error);
      alert('Registration Failed, Please try again after sometime');
    }
  }

  return (
    <div className='registrationSection'>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form action="" className='authForm' onSubmit={handleSubmit} >
        <h2>Sign Up</h2>
        <h6>or login to your account </h6>
        <img src="image.jpeg" alt="" />
        
        <input type="text" required name='uname' placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type="email" required placeholder='Email' name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <input type="tel" required maxLength="10" placeholder='Phone Number' name="mobile" value={mobile} onChange={(e)=>setMobile(e.target.value)}/>

        <h6>Have a referral code?</h6>
        <button type='submit'>CONTINUE</button>
        <label>By creating an account, I accept the <strong>Terms & conditions & Privacy policy</strong></label>

      </form>
      
    </div>
  )
}

export default Register;
