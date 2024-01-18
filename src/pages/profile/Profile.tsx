import React, { useEffect, useState } from 'react';
import "./styles.css";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import profileApi from '../../api/user/profileApi';

function Profile() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(['token']);
  const [userData, setUserData] = useState(null);
  const [msg, setMsg] = useState("Loading user profile...");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (!cookies.token) {
      navigate("/login");
    }

    profileApi.getUserProfile()
      .then(user => {
        setUserData(user);
        setAdmin(user.admin);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
        setMsg("Error");
      });
  }, [cookies.token, navigate, removeCookie]);

  return (
    <>
      <Navbar admin={admin} />
      <div className="user-profile">
        <h1>User Profile</h1>
        {userData ? (
          <ul>
            {Object.entries(userData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {String(value)}
              </li>
            ))}
          </ul>
        ) : (
          <p className='loading'>{msg}</p>
        )}
      </div>
    </>
  );
}

export default Profile;
