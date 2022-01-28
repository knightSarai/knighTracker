import {Box, Button, Grid, TextField} from '@mui/material';
import {useForm} from "@hooks/";
import {useAuth, IRegisterState} from "@hooks/useAuth";


export const RegisterForm: React.FC = () => {
    const initialValues = {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordConfirm: '',
    }
    const {register} = useAuth();
    const {
        formState,
        handleChange,
        handleSubmit
    } = useForm<IRegisterState>(initialValues);

    const onSubmit = (formState: IRegisterState) => register(formState)

    return (
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
            </Grid>
        </Box>
    )
}

export default RegisterForm;