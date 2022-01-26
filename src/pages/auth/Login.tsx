import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useTypedSelector} from '@hooks/';
import {Typography, Link, Box, Button, Grid, TextField} from '@mui/material';
import Layout from '@components/Layout';
import {getUser} from '@state/';
import {Api} from '@global/';
import FlexedBox from "@components/FlexedBox";

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const api = Api.getInstance();
    const {user} = useTypedSelector((state) => state);

    useEffect(() => {
        if (user.isAuthenticated) navigate(-1);
    }, [navigate, user]);

    const login = async (username: string, password: string) => {
        try {
            const {data} = await api.post('/auth/login/', {
                username,
                password,
            });

            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            Api.setAuth(data.access);

            dispatch(getUser());
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const data = new FormData(evt.currentTarget);
        await login(data.get('username') as string, data.get('password') as string);
    };

    return (
        <Layout>
            <FlexedBox styles={{marginTop: 8}}>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User Name"
                        name="username"
                        autoComplete="username"
                        autoFocus
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
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={RouterLink} to="/auth/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </FlexedBox>
        </Layout>
    );
};

export default LoginPage;
