import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {
    Typography,
    Grid,
    Button,
    TextField,
    Box,
    Link
} from '@mui/material';
import Layout from '@components/Layout';
import {Api} from "@global/";
import {useTypedSelector} from "@hooks/";
import {useEffect} from "react";

export const RegisterPage: React.FC = () => {
    const navigate = useNavigate()
    const api = Api.getInstance()
    const {user} = useTypedSelector((state) => state);

    useEffect(() => {
        if (user.isAuthenticated) navigate('/');
    }, [navigate, user]);

    const register = async (formData: FormData) => {
        try {
            await api.post('/auth/signup/', formData);
            navigate('/auth/login/')
        } catch (err) {
            console.log(err);
        }
    };
    const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const data = new FormData(evt.currentTarget);
        await register(data)
    };

    return (
        <Layout>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstname"
                                required
                                fullWidth
                                id="firstname"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastname"
                                label="Last Name"
                                name="lastname"
                                autoComplete="family-name"
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password_confirm"
                                label="Password_confirm"
                                type="password"
                                id="password_confirm"
                                autoComplete="new-password-confirm"
                            />
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link component={RouterLink} to="/auth/login/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Layout>
    );
};

export default RegisterPage;
