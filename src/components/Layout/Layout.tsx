import React from 'react';
import { Container } from '@mui/material';

const Layout: React.FC = ({ children }) => {
  return <Container maxWidth="sm">{children}</Container>;
};

export default Layout;
