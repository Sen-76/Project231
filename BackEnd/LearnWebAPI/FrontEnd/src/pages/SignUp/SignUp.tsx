import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import './SignUp.scss';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import * as userService from '../../services/userService';
import routeConfig from '../../config/routes';
import { IUser, defaultUserState } from '../../interface/user';
import Alert from '@mui/material/Alert';

const defaultTheme = createTheme();

export default function SignUp() {
    const [userRegis, setUserRegis] = useState<IUser>(defaultUserState);
    const [alert, setAlert] = useState<string>('');

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await userService
            .regis(userRegis)
            .then((result) => {
                if (result.success === false) {
                    setAlert(result.message);
                } else {
                    window.location.href = routeConfig.signin;
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
                        Sign up
                    </Typography>
                    {alert === 'false' ? (
                        <Alert severity="error">This is an error alert — check it out!</Alert>
                    ) : (
                        <div>No</div>
                    )}

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
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="avatar"
                                    label="Avatar"
                                    type="avatar"
                                    id="avatar"
                                    autoComplete="avatar"
                                    // onChange={(e) => setUserRegis({ ...userRegis, avatar: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="dob"
                                    label="Date of Birth"
                                    type="dob"
                                    id="dob"
                                    autoComplete="dob"
                                    onChange={(e) => setUserRegis({ ...userRegis, dateOfBirth: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign Up
                        </Button>
                        <div className="linkToSignIn">
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signin" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </div>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
