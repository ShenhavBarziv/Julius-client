import React, { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { UserTypeWithoutPasswordAndAdminAndId } from './types';
import Loading from '../../components/loading/Loading';
import { signupApi } from '../../api/auth/authAPI';
import { useNavigate } from 'react-router-dom';
import Copyright from '../../components/copyright/Copyright';
export default function SignUp() {
  const [isLoading, SetIsLoading] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    SetIsLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataObj = {
      email: String(data.get('email')),
      password: String(data.get('password')),
      name: String(data.get('name')),
      phoneNumber: String(data.get('phone-number')),
      job: String(data.get('job')),
      birthDate: String(data.get('birth-date')),
      position: String(data.get('position')),
      hireDate: String(data.get('hire-date')),
    } as UserTypeWithoutPasswordAndAdminAndId;
    signupApi.signUpUser(dataObj).then(res => {
      alert(res.message);
      if (res.success) {
        document.cookie = "email=" + dataObj.email + '; path=/';
        navigate('/login');
      }
    }).catch(() => { alert("Error"); }).finally(() => {
      SetIsLoading(false);
    });
  }, []);

  return (
    <Container component="main" maxWidth="md" sx={{ display: 'flex', backgroundColor: '#f0f0f0', flexDirection: 'column', minHeight: '100vh', padding: '2rem', textAlign: 'center' }}>
      <Container component="main" maxWidth="sm" sx={{ mt: -5 }}>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Typography component="h1" variant="h4">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, backgroundColor: 'white', p: 3, borderRadius: 4, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                  Login info
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      type="email"
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="password"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="phone-number"
                      label="Phone number"
                      name="phone-number"
                      autoComplete="phone"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="job"
                      label="Job"
                      name="job"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="position"
                      label="Position"
                      name="position"
                    />
                  </Grid>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid item xs={6} sm={6}>
                      <DatePicker
                        disableFuture
                        label="Birth Date"
                        name="birth-date"
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <DatePicker
                        disableFuture
                        label="Hire Date"
                        name="hire-date"
                      />
                    </Grid>
                  </LocalizationProvider>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: '#3498db', color: 'white' }}
                  disabled={isLoading}
                >
                  Sign Up
                </Button>
                <Link href="/login" variant="body2">
                  Have an account? Log in
                </Link>
              </Box>
            </>
          )}
        </Box>
      </Container>
      <Copyright sx={{ padding: '10px', textAlign: 'center', backgroundColor: '#f1f1f1' }} />
    </Container>
  );
}
