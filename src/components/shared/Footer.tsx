import React from 'react';
import { Container, Box, Typography, IconButton, Button } from '@mui/material';

import Grid from '@mui/material/Grid2';
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        bgcolor: 'primary.main',
        color: 'white',
        py: 1,
        px: 2,
      }}>
      <Container>
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          {/* Company Info */}
          <Grid size={12} sx={{ textAlign: 'center' }}>
            <Typography variant="h6">Traveller</Typography>
            <Typography variant="body1">
              Copyright ©
              <Button target="_blank" href="https://www.facebook.com/mhmd.bdair/" color="inherit">
                Mohammad Bdair
              </Button>
              {new Date().getFullYear()}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
