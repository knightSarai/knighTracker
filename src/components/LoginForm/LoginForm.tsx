import {useAuth, useForm} from "@hooks/";
import {Box, Button, TextField} from "@mui/material";


interface IFormState {
    username: string;
    password: string;
}

export const LoginForm: React.FC = () => {
    const initialValues = {username: "", password: ""};

    const {
        formState,
        handleChange,
        handleSubmit
    } = useForm<IFormState>(initialValues);
    const {login} = useAuth();
    const onSubmit = (formState: IFormState) => login(formState.username, formState.password);

    return (
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
        </Box>
    )
}

export default LoginForm