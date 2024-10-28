


// import React, { useState, useEffect } from 'react';
// import { getAuth, sendPasswordResetEmail } from 'firebase/auth'; // Import modular Firebase functions
// import { toast } from 'react-toastify';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// const ForgotPassword = ({ history }) => {
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);

//   const { user } = useSelector((state) => ({ ...state }));
//   const navigate = useNavigate(); // Initialize useNavigate
//   useEffect(() => {
//     if (user && user.token) navigate('/');
//   }, [user, history]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const auth = getAuth(); // Get the Firebase Auth instance
//     const config = {
//       url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
//       handleCodeInApp: true,
//     };

//     await sendPasswordResetEmail(auth, email, config)
//       .then(() => {
//         setEmail('');
//         setLoading(false);
//         toast.success('Check your email for the password reset link');
//       })
//       .catch((error) => {
//         setLoading(false);
//         toast.error(error.message);
//         console.log('ERROR MSG IN FORGOT PASSWORD', error);
//       });
//   };

//   return (
//     <div className="container col-md-6 offset-md-3 p-5">
//       {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Forgot Password</h4>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           className="form-control"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           autoFocus
//         />
//         <br />
//         <button className="btn btn-raised btn-secondary" disabled={!email}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;



import React, { useState, useEffect } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'; // Import modular Firebase functions
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate(); // Initialize useNavigate
  useEffect(() => {
    if (user && user.token) navigate('/');
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth(); // Get the Firebase Auth instance
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await sendPasswordResetEmail(auth, email, config)
      .then(() => {
        setEmail('');
        setLoading(false);
        toast.success('Check your email for the password reset link');
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
        console.log('ERROR MSG IN FORGOT PASSWORD', error);
      });
  };

  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Forgot Password</h4>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <br />
        <button className="btn btn-raised btn-secondary" disabled={!email}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;