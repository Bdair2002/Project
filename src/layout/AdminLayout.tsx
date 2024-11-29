import { Outlet } from 'react-router-dom';
import React from 'react';
import { AdminNavigation } from '../components/Navbar';
import { Box } from '@mui/material';
import Footer from '../components/shared/Footer';
import useMediaQuery from '../hooks/useMediaQuery';
import { useScrollTop, useDocumentTitle } from '../hooks';
const AdminLayout = () => {
  const { isMobile } = useMediaQuery();
  useScrollTop();
  useDocumentTitle('Admin Panel');
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
      <AdminNavigation />
      <Box sx={{ padding: `${isMobile ? '1rem' : '0 4rem'}` }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default AdminLayout;
