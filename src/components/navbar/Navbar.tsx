import React from 'react';
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, Link } from 'react-router-dom';
//import { useAuth } from '../../context/'; // Import the useAuth hook

function Navbar({ admin = false }: { admin?: boolean }) {
  const navigate = useNavigate();
  //const location = useLocation();
  //const [cookies, removeCookie] = useCookies(["token"]);
  //const { user, logout } = useAuth(); // Use the useAuth hook to get user information

  async function disconnect() {
    alert("Disconnecting...");
    //logout();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  }

  return (
    <nav>
      <Link to="/profile"> Profile </Link>
      <Link to="/employee-list"> Employee List </Link>

      admin && <Link to="/admin" > Admin </Link> {/* Display "Admin" link if user is logged in and isAdmin */}
      <a onClick={disconnect} id='disconnect' > Disconnect </a>
    </nav>
  );
}
export default Navbar;