import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Typography,
  Link,
  Container,
  Divider,
  Box,
  Button,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useApi, useTypedSelector } from '@hooks/';
import { API_URL } from '@config/';
import { getUser } from '@state/';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useTypedSelector((state) => state);
  // const navigate = useNavigate();
  // const getUser = useActions();
  const api = useApi();

  const getUserFun = async () => {
    try {
      const { data } = await api.get(`${API_URL}/auth/user`);
      console.log(data);
    } catch (err) {}
  };

  const getMeasurements = async () => {
    try {
      const { data } = await api.get(`${API_URL}/trainee/measurements`);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      dispatch(getUser());
    })();
  }, [dispatch]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h1">Home</Typography>
      <Link component={RouterLink} to="/auth/login">
        Login
      </Link>
      <Divider />
      <Link component={RouterLink} to="/auth/register">
        Register
      </Link>
      <Typography>User: {user.username}</Typography>
      <Box sx={{ marginLeft: '5rem' }}>
        <Button onClick={getUserFun}>Get User</Button>
        <Button onClick={getMeasurements}>Get Measurements</Button>
      </Box>
    </Container>
  );
};

export default HomePage;
