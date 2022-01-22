import { Typography, Divider, Box, Button } from '@mui/material';
import { useApi, useTypedSelector } from '@hooks/';
import { API_URL } from '@config/';
import Layout from '@components/Layout';

export const HomePage: React.FC = () => {
  const { user } = useTypedSelector((state) => state);
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

  return (
    <Layout>
      <Typography variant="h3">Home</Typography>
      <Divider />
      <Typography>User: {user.username}</Typography>
      <Box sx={{ marginLeft: '5rem' }}>
        <Button onClick={getUserFun}>Get User</Button>
        <Button onClick={getMeasurements}>Get Measurements</Button>
      </Box>
    </Layout>
  );
};

export default HomePage;
