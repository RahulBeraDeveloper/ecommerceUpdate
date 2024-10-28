
import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { getAuth, updatePassword } from "firebase/auth"; // Correct import for updatePassword
import { toast } from "react-toastify";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Get the current user from Firebase Auth
  const auth = getAuth();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (user) {
      // Firebase v9 way to update the password
      await updatePassword(user, password)
        .then(() => {
          setLoading(false);
          setPassword("");
          toast.success("Password updated");
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
        });
    } else {
      setLoading(false);
      toast.error("No user is currently logged in.");
    }
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter new password"
          disabled={loading}
          value={password}
        />
        <button
          className="btn btn-primary"
          disabled={!password || password.length < 6 || loading}
        >
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Password Update</h4>
          )}
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
