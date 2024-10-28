
import React, { useState } from 'react';
import './Register.css'; // Ensure you import your CSS file
import { auth } from '../../firebase'; // Import from firebaseConfig.js
import { sendSignInLinkToEmail } from 'firebase/auth'; // Import the specific method from firebase/auth
import { toast } from 'react-toastify';


const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("env===>",process.env.REACT_APP_REGISTER_REDIRECT_URL);
    const config = {
      url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true
    };
    try {
      await sendSignInLinkToEmail(auth, email, config);
      toast.success(`Email is sent to ${email}. Click the link to complete your registration`);
      window.localStorage.setItem('emailForRegistration', email); // Save user email in local storage
      setEmail('');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        className="form-control" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Enter your email"
        autoFocus 
      />
      <br/>
      <button type="submit" className="btn-12"><span>Register</span></button>
    </form>
  );

  return (
    <>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>Register</h4>
          
            {registerForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
