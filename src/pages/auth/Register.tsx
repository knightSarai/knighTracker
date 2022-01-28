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
import FlexedBox from "@components/FlexedBox";
import {Api} from "@global/";
import {useForm, useTypedSelector} from "@hooks/";
import {useEffect} from "react";

interface IFormState {
    username:string;
    firstname:string;
    lastname:string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export const RegisterPage: React.FC = () => {
    const initialValues ={
        username:'',
        firstname:'',
        lastname:'',
        email: '',
        password: '',
        passwordConfirm: '',
    }
    const navigate = useNavigate()
    const api = Api.getInstance()
    const {user} = useTypedSelector((state) => state);
    const {
        formState,
        handleChange,
        handleSubmit
    } = useForm<IFormState>(initialValues);

    useEffect(() => {
        if (user.isAuthenticated) navigate('/');
    }, [navigate, user]);

    const register = async (registerData: IFormState) => {
        try {
            await api.post('/auth/signup/', {
                ...registerData,
                password_confirm: formState.passwordConfirm
            });
            navigate('/auth/login/')
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmit = (formState: IFormState) => register(formState)

    return (
        <Layout>
            <FlexedBox styles={{marginTop: 8}}>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                value={formState.username}
                                onChange={handleChange}
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
                                value={formState.firstname}
                                onChange={handleChange}
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
                                value={formState.lastname}
                                onChange={handleChange}
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
                                value={formState.email}
                                onChange={handleChange}
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
                                value={formState.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="passwordConfirm"
                                label="Password Confirm"
                                type="password"
                                id="passwordConfirm"
                                autoComplete="new-password-confirm"
                                value={formState.passwordConfirm}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 2, mb: 1}}
                            >
                                Sign Up
                            </Button>
                        </Grid>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link component={RouterLink} to="/auth/login/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </FlexedBox>
        </Layout>
    );
};

export default RegisterPage;
