import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Input, Box, Button } from '@mui/material';
import Layout from '@components/Layout';
import { getUser } from '@state/';
import { useApi } from '@hooks/';
import { API_URL } from '@config/';

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const api = useApi();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const { data } = await api.post(`${API_URL}/auth/login/`, {
        username,
        password,
      });
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);

      api.defaults.headers.common = {
        ...api.defaults.headers.common,
        Authorization: `Bearer ${data.access}`,
      };
      // api.defaults.headers.common['Authorization'] = `JWT ${data.access}`;
      dispatch(getUser());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <Typography variant="h1">Login Page</Typography>
      <Box sx={{ marginLeft: '5rem' }}>
        <Box>
          <Input
            onChange={(evt) => setUsername(evt.target.value)}
            value={username}
            placeholder="Username"
          />
        </Box>
        <Box>
          <Input
            onChange={(evt) => setPassword(evt.target.value)}
            value={password}
            placeholder="Password"
          />
        </Box>
        <Button onClick={login}>Login</Button>
      </Box>
    </Layout>
  );
};

export default LoginPage;
