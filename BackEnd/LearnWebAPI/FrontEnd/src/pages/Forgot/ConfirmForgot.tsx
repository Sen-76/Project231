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
import { useAppSelector } from '../../store/hook';
import { setLoading } from '../../store/controllerSlice';

const defaultTheme = createTheme();

interface IResetPass {
    verifyString: string;
    password: string;
    confirmPassword: string;
}
const defaultResetPass = {
    verifyString: '',
    password: '',
    confirmPassword: '',
};
export default function ConfirmForgot() {
    const [forgotO, setforgotO] = useState(useAppSelector((state) => state.user.UserForgot));
    const [resetPass, setResetPass] = useState<IResetPass>(defaultResetPass);
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
                .resetPassword({ ...forgotO, NewPass: resetPass.password })
                .then((result) => {
                    if (result.success === false) {
                        setErrors({ ...errors, email: result.message });
                    } else {
                        dispatch(setVerifyCode(result.data));
                        navigate(location.pathname.split('/confirmforgot')[0] + routeConfig.signin);
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
        if (!resetPass.password.trim()) {
            newError.password = 'This field is required';
        }
        if (!resetPass.confirmPassword.trim()) {
            newError.confirmPassword = 'This field is required';
        } else if (resetPass.password.trim() !== resetPass.confirmPassword.trim()) {
            newError.confirmPassword = 'Password are not match';
        }
        if (!resetPass.verifyString.trim()) {
            newError.verifyString = 'This field is required';
        } else if (resetPass.verifyString.trim() !== forgotO.VerifyCode) {
            newError.verifyString = 'Verify code is not correct';
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
                        Verify your email
                    </Typography>
                    <label>Chúng tôi đã gửi cho bạn 1 đoạn mã xác nhận, Hãy check mail và nhập mã ý vào đây</label>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="verifyCode"
                            label="Verify Code"
                            name="verifyCode"
                            autoComplete="verifyCode"
                            autoFocus
                            onChange={(e) => setResetPass({ ...resetPass, verifyString: e.target.value })}
                            error={!!errors.verifyString}
                            helperText={errors.verifyString}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="newPassword"
                            label="New Password"
                            name="newPassword"
                            autoComplete="newPassword"
                            autoFocus
                            onChange={(e) => setResetPass({ ...resetPass, password: e.target.value })}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="confirmPassword"
                            label="Confirm Password"
                            name="confirmPassword"
                            autoComplete="confirmPassword"
                            autoFocus
                            onChange={(e) => setResetPass({ ...resetPass, confirmPassword: e.target.value })}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
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
