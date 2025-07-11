import React, { useState, useRef, useEffect } from 'react'
import { API_URL } from '../../api';

const Login = ({ showLogoutHandler, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);


  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);


  const [secondsLeft, setSecondsLeft] = useState(120);
  const [resendAvailable, setResendAvailable] = useState(false);

  useEffect(() => {
    let timer;
    if (otpSent && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }

    if (secondsLeft === 0) {
      clearInterval(timer);
      setResendAvailable(true);
    }

    return () => clearInterval(timer);
  }, [otpSent, secondsLeft]);




  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${API_URL}/user/userlogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json();

      if (response.ok) {
        alert("OTP sent to your email");
        setOtpSent(true);
        localStorage.setItem("user_email", email);

      } else {
        setError(data.message || "Login failed")
        alert(data.message || "Login falied ")
      }
    } catch (error) {
      console.log("Login error:", error);
      alert("Something went wrong");
    }
  }

  const handleResendOtp = async () => {
    setResendAvailable(false);
    setSecondsLeft(120);
    try {
      const res = await fetch(`${API_URL}/user/userlogin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();

      if (res.ok) {
        alert("OTP resent successfully");
      } else {
        alert(data.message || "Resend failed");
      }
    } catch (err) {
      alert("Something went wrong while resending OTP");
    }
  };


  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) {
      alert("Please enter all 6 digits of the OTP");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/user/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, otp: fullOtp })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user_token', data.token);
        // localStorage.setItem('email',email)
        
        // showLogoutHandler();
        // window.location.replace("/");
        setIsLoggedIn(true); // ✅ update login state
        setEmail("");
        setOtp(["", "", "", "", "", ""]);
        setOtpSent(false);
        alert("Login Successful");
        window.location.replace('/');
      } else {
        alert(data.message || "Invalid Otp")
      }
    } catch (error) {
      alert("otp verification failed");
    }

  }

  return (
    <div className='loginSection'>
      <form action="" className='authLoginForm' onSubmit={otpSent ? handleOtpSubmit : handleEmailSubmit} >
        <h2>Login</h2>
        <h6>or Signup here for new account </h6>

        {!otpSent && (
          <>
            <h6>Enter your registered email to receive OTP</h6>
            <input type="text"
              name="email" required
              placeholder='Enter your Email Id'
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </>
        )}

        {otpSent && (
          <div className="otp-container">
            <h6>Enter the 6-digit OTP sent to your email</h6>
            <div className="otp-inputs">
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  ref={(el) => (inputsRef.current[index] = el)}
                />
              ))}
            </div>
            <div className="resend-section" style={{ marginTop: "10px" }}></div>
            {resendAvailable ? (
              <button type="button" onClick={handleResendOtp}>
                Resend OTP
              </button>
            ) : (
              <p style={{ color: "gray" }}>Resend available in {secondsLeft}s</p>
            )}
          </div>
        )}
        <div className="btn-submit">
          <button type="submit" >
            {otpSent ? "Continue Login" : "Send OTP"}
          </button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login
