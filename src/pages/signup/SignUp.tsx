import React, { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers';
import { UserTypeWithoutAdminAndId } from './types';
import Loading from '../../components/loading/Loading';
import { signupApi } from '../../api/auth/authAPI';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Constant from './constants';
import BasePage from '../../components/basePage/BasePage';
import { Container } from '@mui/material';

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
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
    } as UserTypeWithoutAdminAndId;

    signupApi.signUpUser(dataObj).then(res => {
      if (res.success) {
        document.cookie = "email=" + dataObj.email + '; path=/';
        toast.success(res.message || Constant.SUCCESS_SIGN_UP_MESSAGE, {
          position: "bottom-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          onClose: () => {
            navigate(Constant.LOGIN_PATH);
          }
        });
      } else {
        toast.error(res.message || Constant.ERROR_SIGN_UP_MESSAGE, {
          position: "bottom-center",
          autoClose: 1300,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
          onClose: () => { setIsLoading(false); }
        });
      }
    }).catch(() => {
      toast.error(Constant.ERROR_SIGN_UP_MESSAGE, {
        position: "bottom-center",
        autoClose: 1300,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        onClose: () => { setIsLoading(false); }
      });
    })
  }, []);

  return (
    <BasePage noNav>
      <Container component="main" maxWidth="sm" sx={{ mt: -5 }}>
        <ToastContainer />
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
                {Constant.SIGN_UP_HEADER}
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, backgroundColor: 'white', p: 3, borderRadius: 4, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                  {Constant.LOGIN_HEADER}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      type="email"
                      id="email"
                      label={Constant.EMAIL_LABEL}
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
                      label={Constant.PASSWORD_LABEL}
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
                      label={Constant.NAME_LABEL}
                      name="name"
                      autoComplete="name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="phone-number"
                      label={Constant.PHONE_NUMBER_LABEL}
                      name="phone-number"
                      autoComplete="phone"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="job"
                      label={Constant.JOB_LABEL}
                      name="job"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="position"
                      label={Constant.POSITION_LABEL}
                      name="position"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <DatePicker
                      disableFuture
                      label={Constant.BIRTH_DATE_LABEL}
                      name="birth-date"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <DatePicker
                      disableFuture
                      label={Constant.HIRE_DATE_LABEL}
                      name="hire-date"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: '#3498db', color: 'white' }}
                  disabled={isLoading}
                >
                  {Constant.SIGN_UP_BUTTON_TEXT}
                </Button>
                <Link href={Constant.LOGIN_PATH} variant="body2">
                  {Constant.HAVE_ACCOUNT_LINK_TEXT}
                </Link>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </BasePage>
  );
}
