import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailLink, updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Register.css'; // Ensure you import your CSS file
import { useDispatch, useSelector } from 'react-redux'; // Redux import
import {createOrUpdateUser} from "../../functions/auth"


const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  let dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [navigate]);

  //---roleBasedRedirect---
  const roleBasedRedirect = (res) =>{
    if(res.data.role === 'admin'){
      navigate('/admin/dashboard');
    }else{
      navigate('/user/history');
    }
  }
  useEffect(() => {
    if (user && user.token) navigate("/"); // Use navigate for redirection
  }, [user, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
  
    try {
      const result = await signInWithEmailLink(auth, email, window.location.href);
      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        const user = auth.currentUser;

        // Update the user's password
        await updatePassword(user,password);
        
        const idTokenResult = await user.getIdTokenResult();
        // redux store (if using redux)
        console.log("user", user, "idTokenResult", idTokenResult);
        // redirect to home page or another page


        createOrUpdateUser(idTokenResult.token)
        .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
            // navigate("/"); // Redirect on successful login
          }
        ).catch((err)=>{
          console.log(err);
        });
        navigate("/"); // Use navigate instead of history.push
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />

      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />
      <br />
      <button type="submit" className="btn-12">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
