
import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from '../../firebase'; // Firebase configuration
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'; // Firebase modular import
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'; // Redux import

import './Login.css'; // Ensure you import your custom CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';
import {createOrUpdateUser} from "../../functions/auth"



const Login = () => { // Remove history prop here
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use navigate

  let dispatch = useDispatch();
  
  useEffect(() => {
    if (user && user.token) navigate("/"); // Use navigate for redirection
  }, [user, navigate]);

//---roleBasedRedirect---
const roleBasedRedirect = (res) => {
  if (res.data.role === "admin") {
    navigate("/admin/dashboard");
  } else {
    navigate("/user/history");
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      
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
      ).catch();

    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
        
      // createOrUpdateUser(idTokenResult.token)
      // .then((res) => {
      //     dispatch({
      //       type: "LOGGED_IN_USER",
      //       payload: {
      //         name: res.data.name,
      //         email: res.data.email,
      //         token: idTokenResult.token,
      //         role: res.data.role,
      //         _id: res.data._id,
      //       },
      //     });
      //     roleBasedRedirect(res);
      //     // navigate("/"); // Redirect after Google login
      //   }
      // ).catch();
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
      })
      .catch((err) => console.log(err));

    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input 
          type="email" 
          className="form-control" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter your email"
          autoFocus 
        />
      </div>
      <br />
      <div>
        <input 
          type="password" 
          className="form-control" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Enter your password"
        />
      </div>
      <br />
      <Button
        onClick={handleSubmit}
        type="submit"
        className="mb-3 btn-block btn-primary rounded-pill"
        size="lg"
        disabled={!email || password.length < 6}
      >
        <i className="bi bi-envelope"></i> Login with Email/Password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (<h4 className="text-danger">Loading</h4>) : <h4>Login</h4>}
          {loginForm()}

          <Button
            onClick={googleLogin}
            type="submit"
            className="mb-3 btn-block btn-danger rounded-pill"
            size="lg"
            style={{ backgroundColor: '#C63C51' }}
          >
            <i className="bi bi-google"></i> Login with Google
          </Button>
          <Link to="/forgot/password" className="d-block text-end text-danger">Forgot Password</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

