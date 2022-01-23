import { Typography, Grid } from '@mui/material';
import Layout from '@components/Layout';

export const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <Grid
        justifyContent="center"
        sx={{ textAlign: 'center' }}
        alignItems="center"
        container
        spacing={3}
      >
        <Grid item xs={12}>
          <Typography variant="h1">404</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Oops..! Page Not Found</Typography>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default NotFoundPage;
