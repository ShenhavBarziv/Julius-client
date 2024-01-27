import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { Typography, Container, Box, Link as MuiLink, Button, CssBaseline } from '@mui/material';
import { useCookies } from 'react-cookie';
import adminApi from '../../api/admin/adminApi';
import Loading from '../../components/loading/Loading';

const Admin = () => {
  const [cookies, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);

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
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [cookies.token, navigate, removeCookie]);

  return (
    <Container>
      <CssBaseline />
      <Navbar admin={isAdmin} />
      {isAdmin && (
        <Box className="admin-page" textAlign="center" p={4}>
          <Typography variant="h4" gutterBottom>
            Welcome to the Admin Page
          </Typography>
          <Box mt={3}>
            <MuiLink component={Link} to="/admin/edit">
              <Button variant="contained" color="primary" size="medium" fullWidth>
                Edit User
              </Button>
            </MuiLink>
          </Box>
          <Box mt={3}>
            <MuiLink component={Link} to="/admin/approve">
              <Button variant="contained" color="secondary" size="medium" fullWidth>
                Approve Users
              </Button>
            </MuiLink>
          </Box>
        </Box>
      )}
      {IsLoading && <Loading />}
    </Container>
  );
};

export default Admin;
