import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IUserLogin, defaultUserLogin } from '../../interface/user';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hook';
import jwt_decode from 'jwt-decode';
import { login, setToken, UserLogin } from '../../store/userSlice';
import * as userService from '../../services/userService';
import {
    Box,
    Grid,
    Link,
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

const defaultTheme = createTheme();

export default function SignIn() {
    const [userLogin, setUserLogin] = useState<IUserLogin>(defaultUserLogin);
    const [alert, setAlert] = useState<string>('');
    const dispatch = useDispatch();
    const userLoginTest = useAppSelector((state) => state.user.UserLogin);
    console.log(userLoginTest);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await userService
            .login(userLogin)
            .then((result) => {
                if (result.success === false) {
                    setAlert(result.message);
                } else {
                    const user: UserLogin = jwt_decode(result.data.accessToken);
                    dispatch(login(user));
                    dispatch(setToken(result.data.accessToken));
                    user.Role === 'Admin' && (window.location.href = routeConfig.adminDashboard);
                    window.location.href = routeConfig.home;
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

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
                    {alert ?? <Alert severity="error">This is an error alert — check it out!</Alert>}
                    <Box component="form" onSubmit={() => handleSubmit} noValidate sx={{ mt: 1 }}>
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
                        />
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
