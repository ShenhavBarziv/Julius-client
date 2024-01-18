// components/Admin/Admin.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import './styles.css';
import { useCookies } from 'react-cookie';
import adminApi from '../../api/admin/adminApi';

function Admin() {
  const [cookies, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!cookies || !cookies.token) {
      navigate('/login');
    }

    adminApi.checkAdminStatus()
      .then(isAdminUser => {
        setIsAdmin(isAdminUser);
      })
      .catch(error => {
        console.error('Error checking admin status:', error);
        alert('Error\nRedirecting to login');
        navigate('/login');
      });
  }, [cookies.token, navigate, removeCookie]);

  return (
    <>
      <Navbar admin={isAdmin} />
      {isAdmin && (
        <div className="admin-page">
          <h1>Welcome to the Admin Page</h1>
          <Link to="/admin/edit" className="admin-link">
            Edit User
          </Link>
          <Link to="/admin/approve" className="admin-link">
            Approve Users
          </Link>
        </div>
      )}
    </>
  );
}

export default Admin;
