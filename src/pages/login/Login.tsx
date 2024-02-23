import { useState, FormEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as Constant from './constants';
import { loginApi } from "../../api/auth/authAPI";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LinkMui from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Loading from "../../components/loading/Loading";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BasePage from "../../components/basePage/BasePage";
function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [isLoading, SetIsLoading] = useState(false);

    const handleSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        SetIsLoading(true);
        try {
            const res = (await loginApi.loginUser(email, password));
            if (res.user) {
                login(res.user);
                toast.success(res.message || Constant.SUCCESS_LOGIN_MESSAGE, {
                    position: "bottom-center",
                    autoClose: 1300,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    onClose: () => {
                        navigate(Constant.PROFILE_PATH);
                    }
                });
            } else {
                if (res.message) {
                    toast.error(res.message, {
                        position: "bottom-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                    });

                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Error", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        } finally {
            SetIsLoading(false);
        }
    }, [email, password])

    return (
        <BasePage noNav>
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
                            {Constant.LOGIN_HEADER}
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
                            <LinkMui href={Constant.REGISTER_PATH} variant="body2">{Constant.SIGNUP_SENTENCE}</LinkMui>
                        </Box>
                    </>
                )}
            </Box>
        </BasePage >
    );
}

export default Login;