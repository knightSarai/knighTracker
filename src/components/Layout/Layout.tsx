import React from 'react';
import Navbar from '@components/Navbar';
import { Container } from '@mui/material';

const Layout: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <Container maxWidth="sm">{children}</Container>;
    </React.Fragment>
  );
};

export default Layout;
