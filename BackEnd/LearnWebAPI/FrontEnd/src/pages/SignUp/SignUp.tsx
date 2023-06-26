import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container } from '@mui/material';
import './SignUp.scss';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import * as userService from '../../services/userService';
import routeConfig from '../../config/routes';
import { IUser, defaultUserState } from '../../interface/user';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAlert, setLoading } from '../../store/controllerSlice';
import { enqueueSnackbar, useSnackbar } from 'notistack';

const defaultTheme = createTheme();

export default function SignUp() {
    const [userRegis, setUserRegis] = useState<IUser>(defaultUserState);
    const [errors, setErrors] = useState<any>({});
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!validateForm()) {
            console.log('form invalid');
        } else {
            dispatch(setLoading(true));
            await userService
                .regis(userRegis)
                .then((result) => {
                    if (result.success === false) {
                        result.message === 'Email and Username already exist' &&
                            setErrors({ ...errors, username: 'Username already exist', email: 'Email already exist' });
                        result.message === 'Username already exist' &&
                            setErrors({ ...errors, username: result.message, email: '' });
                        result.message === 'Email already exist' &&
                            setErrors({ ...errors, email: result.message, username: '' });
                    } else {
                        navigate(location.pathname.split('/signup')[0] + routeConfig.signin);
                        enqueueSnackbar('Đăng kí thành công', {
                            variant: 'success',
                            anchorOrigin: { vertical: 'top', horizontal: 'right' },
                        });
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

        if (!userRegis.name.trim()) {
            newError.name = 'This field is required';
        }
        if (!userRegis.username.trim()) {
            newError.username = 'This field is required';
        }

        if (!userRegis.password.trim()) {
            newError.password = 'This field is required';
        }
        const mailreg =
            /^[a-zA-Z0-9~!+#$%^&*=`{}.|_'?\/-]{1,64}@(?=[a-zA-Z0-9]{1,253}(\.[a-zA-Z0-9-]{1,253}){1,255}$)[a-zA-Z0-9.-]{1,255}$/;
        if (userRegis.email && !mailreg.test(userRegis.email)) {
            newError.email = 'Email is invalid';
        }
        const phonereg = /^[0-9]{10}$/;
        if (userRegis.phone && !phonereg.test(userRegis.phone)) {
            newError.phone = 'Phone is invalid';
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    name="name"
                                    autoComplete="name"
                                    onChange={(e) => setUserRegis({ ...userRegis, name: e.target.value })}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    onChange={(e) => setUserRegis({ ...userRegis, username: e.target.value })}
                                    error={!!errors.username}
                                    helperText={errors.username}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => setUserRegis({ ...userRegis, email: e.target.value })}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) => setUserRegis({ ...userRegis, password: e.target.value })}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="phone"
                                    label="Phone"
                                    type="phone"
                                    id="phone"
                                    autoComplete="phone"
                                    onChange={(e) => setUserRegis({ ...userRegis, phone: e.target.value })}
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <div className="linkToSignIn">
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <NavLink to={routeConfig.signin}>Already have an account? Sign in</NavLink>
                                </Grid>
                            </Grid>
                        </div>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
