import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IUserLogin, defaultUserLogin } from '../../interface/user';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { login, UserLogin } from '../../store/userSlice';
import * as userService from '../../services/userService';
import {
    Box,
    Grid,
    Checkbox,
    FormControlLabel,
    TextField,
    CssBaseline,
    Button,
    Avatar,
    Container,
    Typography,
} from '@mui/material';
import routeConfig from '../../config/routes';
import Alert from '@mui/material/Alert';
import { useCookies } from 'react-cookie';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { setLoading } from '../../store/controllerSlice';

const defaultTheme = createTheme();

export default function SignIn() {
    const [userLogin, setUserLogin] = useState<IUserLogin>(defaultUserLogin);
    const [alert, setAlert] = useState<string>('');
    const [errors, setErrors] = useState<any>({});
    const [cookies, setCookie] = useCookies(['userLogin', 'token']);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!validateForm()) {
        } else {
            dispatch(setLoading(true));
            await userService
                .login(userLogin)
                .then((result) => {
                    if (result.success === false) {
                        setAlert(result.message);
                    } else {
                        const user: UserLogin = jwt_decode(result.data.accessToken);
                        setCookie('userLogin', user, { path: '/' });
                        setCookie('token', result.data.accessToken, { path: '/' });
                        dispatch(login(user));
                        user.Role === 'Admin' &&
                            navigate(location.pathname.split('/signin')[0] + routeConfig.adminDashboard);
                        navigate(location.pathname.split('/signin')[0] + routeConfig.home);
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    dispatch(setLoading(false));
                });
        }
    }
    const validateForm = () => {
        const newError: any = {};

        if (!userLogin.username.trim()) {
            newError.username = 'This field is required';
        }

        if (!userLogin.password.trim()) {
            newError.password = 'This field is required';
        }
        setErrors(newError);

        return Object.keys(newError).length === 0;
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {alert && (
                        <Alert severity="error" sx={{ width: '100%' }}>
                            {alert}
                        </Alert>
                    )}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => setUserLogin({ ...userLogin, username: e.target.value })}
                            error={!!errors.username}
                            helperText={errors.username}
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
                            onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <NavLink to={routeConfig.forgot}>Forgot password?</NavLink>
                            </Grid>
                            <Grid item>
                                <NavLink to={routeConfig.signup}>{"Don't have an account? Sign Up"}</NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
