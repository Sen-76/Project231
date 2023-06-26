import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import * as userService from '../../services/userService';
import { Box, Grid, TextField, CssBaseline, Button, Avatar, Container, Typography } from '@mui/material';
import routeConfig from '../../config/routes';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setVerifyCode } from '../../store/userSlice';
import { setLoading } from '../../store/controllerSlice';

const defaultTheme = createTheme();

export default function Forgot() {
    const [email, setEmail] = useState<string>('');
    const [errors, setErrors] = useState<any>({});
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!validateForm()) {
            console.log('Loi kia');
        } else {
            dispatch(setLoading(true));
            await userService
                .forgot(email)
                .then((result) => {
                    if (result.success === false) {
                        setErrors({ ...errors, email: result.message });
                    } else {
                        dispatch(setVerifyCode({ Email: email, VerifyCode: result.data, NewPass: '' }));
                        navigate(location.pathname.split('/forgot')[0] + routeConfig.confirmforgot);
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
        const mailreg =
            /^[a-zA-Z0-9~!+#$%^&*=`{}.|_'?\/-]{1,64}@(?=[a-zA-Z0-9]{1,253}(\.[a-zA-Z0-9-]{1,253}){1,255}$)[a-zA-Z0-9.-]{1,255}$/;
        if (!email.trim()) {
            newError.email = 'This field is required';
        } else if (email && !mailreg.test(email)) {
            newError.email = 'Email is invalid';
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
                        Forgot Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Submit
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink to={routeConfig.signin}>Already remember account? Sign in</NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
