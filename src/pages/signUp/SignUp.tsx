import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import Copyright from '../../components/copyright/Copyright';
import signupApi from '../../api/signupApi';
import { UserData } from './types';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';


export default function SignUp() {
  const [isLoading, SetIsLoading] = useState(false);
  const [message, SetMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    SetIsLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataObj: UserData = {
      email: String(data.get('email')),
      password: String(data.get('password')),
      name: String(data.get('name')),
      phoneNumber: String(data.get('phone-number')),
      job: String(data.get('job')),
      birthDate: String(data.get('birth-date')),
      position: String(data.get('position')),
      hireDate: String(data.get('hire-date')),
    };
    signupApi.signUpUser(dataObj).then(res => {
      SetMessage(res.message);
      if (res.success) {
        alert(res.message)
        document.cookie = "email=" + dataObj.email + '; path=/';
        navigate('/login');
      }
    }).finally(() => {
      SetIsLoading(false);
    });
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: -5 }}>
      <CssBaseline />
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
          <><Typography component="h1" variant="h4">
            Sign up
          </Typography><Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
                    sx={{ width: '100%' }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="password" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="phone-number"
                    label="Phone number"
                    name="phone-number"
                    autoComplete="phone" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="job"
                    label="Job"
                    name="job" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="position"
                    label="Position"
                    name="position" />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disableFuture
                      label="Birth Date"
                      name="birth-date" />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      disableFuture
                      label="Hire Date"
                      name="hire-date" />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                Sign Up
              </Button>
              <Link href="/login" variant="body2">
                Have an account? Log in
              </Link>
            </Box></>
        )}
      </Box>

      <br />
      <br />
      <Copyright />


    </Container >
  );
}
