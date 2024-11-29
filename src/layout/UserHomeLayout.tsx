import { Outlet } from 'react-router-dom';
import React from 'react';
import { UserNavigation } from '../components/Navbar';
import { Box, Container } from '@mui/material';
import Footer from '../components/shared/Footer';

const UserHomeLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
      <Container
        sx={{
          flex: 1,
          mt: 2,
          mb: 2,
        }}>
        <UserNavigation />
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default UserHomeLayout;
