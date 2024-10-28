
import React, { useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PersonPlus, Person, BoxArrowRight } from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'; // Import custom CSS for hover effects
import { getAuth } from 'firebase/auth'; // Correct Firebase import for authentication
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // useNavigate replaces useHistory in React Router v6

const Header = () => {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();
  let navigate = useNavigate(); // useNavigate hook from React Router v6
  let { user } = useSelector((state) => ({ ...state }));

  const handleSelect = (eventKey) => {
    setCurrent(eventKey);
  };

  const logout = () => {
    const auth = getAuth(); // Get the auth instance
    auth.signOut().then(() => {
      dispatch({
        type: "LOGOUT",
        payload: null,
      });
      navigate('/login'); // use navigate instead of history.push
    });
  };

  return (
    <Navbar bg="light" expand="lg" onSelect={handleSelect}>
      <Navbar.Brand as={Link} to="/">MyApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto" activeKey={current}>
          <Nav.Link as={Link} to="/" eventKey="home" className="nav-link-custom">
            Home
          </Nav.Link>
        </Nav>

        <Nav className="ms-auto">
          {
            user && (
              <NavDropdown 
                title={user.email && user.email.split("@")[0]} 
                id="basic-nav-dropdown" 
                className="nav-link-custom"
              >
                {user && user.role === 'subscriber' && (
                  <NavDropdown.Item as={Link} to="/user/history">
                    Dashboard
                  </NavDropdown.Item>
                )}
                {user && user.role === 'admin' && (
                  <NavDropdown.Item as={Link} to="/admin/dashboard">
                    Dashboard
                  </NavDropdown.Item>
                )}
                <NavDropdown.Item onClick={logout} eventKey="logout">
                  <BoxArrowRight /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            )
          }

          {!user && (
            <>
              <Nav.Link as={Link} to="/register" eventKey="register" className="nav-link-custom">
                <PersonPlus /> Register
              </Nav.Link>
              <Nav.Link as={Link} to="/login" eventKey="login" className="nav-link-custom">
                <Person /> Login
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;


