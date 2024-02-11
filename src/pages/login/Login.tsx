import { useState, useEffect, FormEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as Constant from './constants';
import loginApi from "../../api/auth/loginAPI";
import Cookies from "universal-cookie";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LinkMui from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Loading from "../../components/loading/Loading";
import BasePage from "../../components/basePage/BasePage";

function Login() {
    const navigate = useNavigate();
    //const { login } = useAuth();

    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [message, SetMessage] = useState("");
    const [isLoading, SetIsLoading] = useState(false);

    useEffect(() => {
        const cookies = new Cookies();
        const userEmail = cookies.get("email");

        if (userEmail) {
            SetEmail(decodeURIComponent(userEmail));
        }
    }, []);

    const handleSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        SetIsLoading(true);
        SetMessage("");

        try {
            console.log(email, password);
            const res = await loginApi.loginUser(email, password);
            console.log(res)
            if (res.user) {
                // Call the login function from the context to update the user state
                //login(res.user);
                navigate("/profile");
            } else {
                SetMessage(res.msg);
            }
        } catch (error) {
            console.error(error);
            SetMessage("Error");
        } finally {
            SetIsLoading(false);
        }
    }, [email, password])

    return (
        <BasePage>
            <Container component="main" maxWidth="lg" sx={{ mt: -5 }}>
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
                        <>
                            <Typography component="h1" variant="h4">
                                Sign in
                            </Typography>
                            <br />
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: { lg: 300 }, height: { lg: 300 } }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label={Constant.LABELS[0]}
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    onChange={(e) => SetEmail(e.target.value)} />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label={Constant.LABELS[1]}
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => SetPassword(e.target.value)} />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {Constant.BUTTON_TEXT}
                                </Button>
                                {message && (
                                    <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                                        {message}
                                    </Typography>
                                )}
                                <br />
                                <LinkMui href="/signup" variant="body2">{Constant.SIGNUP_SENTENCE}</LinkMui>
                                <br />
                            </Box>
                        </>
                    )}
                </Box>
            </Container>
        </BasePage>
    );
}

export default Login;