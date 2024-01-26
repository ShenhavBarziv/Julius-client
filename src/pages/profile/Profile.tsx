import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { Typography, CircularProgress, Container, Paper, List, ListItem, ListItemText, CssBaseline } from '@mui/material';
import profileApi from '../../api/user/profileApi';
import Loading from '../../components/loading/Loading';

function Profile() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(['token']);
  const [userData, setUserData] = useState(null);
  const [msg, setMsg] = useState('Loading user profile...');
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (!cookies.token) {
      navigate('/login');
    }

    profileApi.getUserProfile()
      .then(user => {
        setUserData(user);
        setAdmin(user.admin);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
        setMsg('Error');
      });
  }, [cookies.token, navigate, removeCookie]);

  return (
    <Container>
      <CssBaseline />
      <Navbar admin={admin} />
      {userData ? (
        <Paper elevation={3} className="user-profile">
          <Typography variant="h4" component="h1" gutterBottom>
            User Profile
          </Typography>
          {Object.entries(userData).map(([key, value]) => (
            <Typography key={key} variant="h5" component="h1" gutterBottom>
              <strong>{key}:</strong> {String(value)}
            </Typography>
          ))}
          <br />
        </Paper>
      ) : (
        <Loading />
      )}

    </Container>
  );
}

export default Profile;
