import React from 'react';
import "./styles.css";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import the useAuth hook

function Navbar({ admin = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, removeCookie] = useCookies(["token"]);
  const { user } = useAuth(); // Use the useAuth hook to get user information

  async function disconnect() {
    alert("Disconnecting...");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  }

  return (
    <>
      <nav>
        <Link to="/profile">Profile</Link>
        <Link to="/employee-list">Employee List</Link>
        {user && user.admin && <Link to="/admin">Admin</Link>} {/* Display "Admin" link if user is logged in and isAdmin */}
        <a onClick={disconnect} className='disconnect'>Disconnect</a>
      </nav>
    </>
  );
}

export default Navbar;
