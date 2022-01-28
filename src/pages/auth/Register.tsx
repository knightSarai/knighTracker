import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {Grid, Link, Typography} from '@mui/material';
import Layout from '@components/Layout';
import FlexedBox from "@components/FlexedBox";
import RegisterForm from "@components/RegisterForm";
import {useTypedSelector} from "@hooks/";
import {useEffect} from "react";


export const RegisterPage: React.FC = () => {
    const navigate = useNavigate()
    const {user} = useTypedSelector((state) => state);

    useEffect(() => {
        if (user.isAuthenticated) navigate('/');
    }, [navigate, user]);

    return (
        <Layout>
            <FlexedBox styles={{marginTop: 8}}>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <RegisterForm/>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link component={RouterLink} to="/auth/login/" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </FlexedBox>
        </Layout>
    );
};

export default RegisterPage;
