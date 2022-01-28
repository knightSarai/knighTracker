import {useEffect} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {useTypedSelector} from "@hooks/";
import {Grid, Link, Typography} from "@mui/material";
import Layout from "@components/Layout";
import FlexedBox from "@components/FlexedBox";
import LoginForm from "@components/LoginForm";

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const {user} = useTypedSelector((state) => state);

    useEffect(() => {
        if (user.isAuthenticated) navigate(-1);
    }, [navigate, user]);

    return (
        <Layout>
            <FlexedBox styles={{marginTop: 8}}>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <LoginForm/>
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
            </FlexedBox>
        </Layout>
    );
};

export default LoginPage;
