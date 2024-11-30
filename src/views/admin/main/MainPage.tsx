import React, { useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import StarRatingPieChart from './components/StarRatingPieChart';
import { useFetchHotelsQuery } from '../../../redux/slices/adminSlices/hotelsSlice';
const AdminDashboard = () => {
  const { data, isLoading } = useFetchHotelsQuery();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 4,
        px: { xs: 2, md: 4 },
      }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          mb: 4,
          textAlign: 'center',
        }}>
        Dashboard 📊
      </Typography>

      <Grid container spacing={4}>
        <Grid size={12}>
          <Paper
            sx={{
              p: 3,
              background: 'linear-gradient(145deg, #1e1e1e, #292929)',
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
              borderRadius: '12px',
              color: '#fff',
            }}>
            <Typography
              variant="h5"
              sx={{
                mb: 2,
                textAlign: 'center',
                fontWeight: 'medium',
                color: '#E0E0E0',
              }}>
              Hotel Star Ratings Distribution
            </Typography>
            {isLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 300,
                }}>
                <CircularProgress sx={{ color: '#BB86FC' }} />
              </Box>
            ) : (
              <StarRatingPieChart hotelData={data || []} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
