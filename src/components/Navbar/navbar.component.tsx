import { useDispatch, useSelector } from 'react-redux';
import { useTypedSelector } from '@hooks/';
import { Link as RouterLink } from 'react-router-dom';
import { UserActionTypes as types } from '@state/';
import { Typography, Toolbar, AppBar, Link, Box, Button } from '@mui/material';

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useTypedSelector((state) => state);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch({
      type: types.SET_USER,
      payload: {},
    });
  };

  const loginHeader = () => {
    if (!user.isAuthenticated)
      return (
        <>
          <Link component={RouterLink} to="/auth/login" color="inherit">
            Login
          </Link>
        </>
      );
    return (
      <>
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" color="inherit">
              Weight Tracker
            </Link>
          </Typography>
          {loginHeader()}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
