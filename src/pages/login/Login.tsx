import React, { useState, useEffect, FormEvent } from "react";
import "./styles.css";
import { useLocation, useNavigate, Link } from "react-router-dom";
import loginApi from "../../api/auth/loginApi";
import axios from "axios";
import Cookies from "universal-cookie";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LinkMui from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cookies = new Cookies();
    const userEmail = cookies.get("email");

    if (userEmail) {
      setEmail(decodeURIComponent(userEmail));
    }
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      console.log(email, password);
      const res = await loginApi.loginUser(email, password);
      console.log(res)
      if (res.user) {
        const cookies = new Cookies();
        cookies.set("email", email, { path: "/" });
        cookies.set("api_token", res.user.api_token, { path: "/" });

        navigate("/profile");
      } else {
        setMessage(res.msg);
      }
    } catch (error) {
      console.error(error);
      setMessage("Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: { lg: 75 }, height: { lg: 75 } }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: { lg: 300 }, height: { lg: 300 } }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {message && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
          <LinkMui href="/signup" variant="body2">Don't have an account? Sign Up</LinkMui>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
