import React, { useEffect, useState } from 'react';
import Navbar from '../../../../../../components/navbar/Navbar';
import editApi from '../../../../../../api/admin/editUserApi';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {
  Container,
  Typography,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Box,
} from '@mui/material';
import Loading from '../../../../../../components/loading/Loading';
import { UserData } from './types';

function EditUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state;
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, removeCookie] = useCookies(['token']);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!cookies || !cookies.token) {
          navigate('/login');
        }

        const response = await editApi.fetchUser(userId);

        if (response.data.status) {
          if (response.data.admin) {
            setAdmin(true);
            setUserData(response.data.data);
          } else {
            alert('Access denied');
            navigate('/profile');
          }
        } else {
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, navigate, cookies]);

  const handleInputChange = (key: string, value: string | boolean) => {
    setUserData((prevUserData: UserData | null) => ({
      ...prevUserData!,
      [key]: value,
    }));
  };

  const formatDateString = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSave = async () => {
    console.log(userData);
    try {
      const response = await editApi.saveUserChanges(userData);
      if (response.data.data.code === 200) {
        navigate('/admin/edit');
      } else {
        alert(response.data.data.msg);
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Error');
    }
  };

  return (
    <>
      <Navbar admin={admin} />
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Edit User
        </Typography>
        {isLoading ? (
          <Loading />
        ) : (
          <Box component="form">
            {userData &&
              Object.entries(userData).map(([key, value]) => (
                key !== '_id' &&
                key !== 'password' && (
                  <div key={key} className="form-group">
                    <label>{key}:</label>
                    {key === 'admin' ? (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={!!value}
                            onChange={(e) => handleInputChange(key, e.target.checked)}
                          />
                        }
                        label="Admin"
                      />
                    ) : key === 'birthDate' || key === 'hireDate' ? (
                      <TextField
                        type="date"
                        value={formatDateString(value as string)}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    ) : (
                      <TextField
                        type="text"
                        value={value as string}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                      />
                    )}
                  </div>
                )
              ))}
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
}

export default EditUser;
