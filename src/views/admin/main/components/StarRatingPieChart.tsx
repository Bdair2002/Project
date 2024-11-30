import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { HotelDto } from '../../../../api/types';

const StarRatingPieChart = ({ hotelData }: { hotelData: HotelDto[] }) => {
  const starRatingsCount = hotelData.reduce((acc: number[], hotel) => {
    if (!hotel.starRating) return acc;
    acc[hotel.starRating] = (acc[hotel.starRating] || 0) + 1;
    return acc;
  }, []);

  const chartData = [
    { label: '0 Stars', value: starRatingsCount[0] || 0 },
    { label: '1 Star', value: starRatingsCount[1] || 0 },
    { label: '2 Stars', value: starRatingsCount[2] || 0 },
    { label: '3 Stars', value: starRatingsCount[3] || 0 },
    { label: '4 Stars', value: starRatingsCount[4] || 0 },
    { label: '5 Stars', value: starRatingsCount[5] || 0 },
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Star Ratings Distribution (Pie Chart)
      </Typography>
      <Box sx={{ height: '300px' }}>
        <PieChart
          series={[
            {
              data: chartData,
            },
          ]}
        />
      </Box>
    </Paper>
  );
};

export default StarRatingPieChart;
