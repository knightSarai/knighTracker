import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {useAuth, useTypedSelector} from "@hooks/";
import {Typography, Link, Box, Button, Grid, TextField} from "@mui/material";
import Layout from "@components/Layout";
import FlexedBox from "@components/FlexedBox";
import {useForm} from "@hooks/";

interface IFormState {
    username: string;
    password: string;
}

export const LoginPage: React.FC = () => {
    const initialValues = {username: "", password: ""};
    const {formState, handleChange, handleSubmit} = useForm<IFormState>(initialValues);
    const navigate = useNavigate();
    const {login} = useAuth();
    const {user} = useTypedSelector((state) => state);
    const onSubmit = (formState: IFormState) => login(formState.username, formState.password);

    useEffect(() => {
        if (user.isAuthenticated) navigate(-1);
    }, [navigate, user]);

    return (
        <Layout>
            <FlexedBox styles={{marginTop: 8}}>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{mt: 1}}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User Name"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={handleChange}
                        value={formState.username}
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
                        onChange={handleChange}
                        value={formState.password}
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
