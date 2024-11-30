import React from 'react';
import { Box, Typography, Card, CardContent, Divider, Button } from '@mui/material';
import useCart from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const navigate = useNavigate();
  const cart = useCart();
  const bookingDetails = cart.bookingDetails;

  if (!bookingDetails) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h6" color="error">
          No booking details available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
      <Card sx={{ backgroundColor: 'transparent' }}>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Booking Confirmation
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            🎉 Thank you for your booking! Here are your details:
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Customer Name:
            </Typography>
            <Typography variant="body2">{bookingDetails.customerName || 'N/A'}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Hotel Name:
            </Typography>
            <Typography variant="body2">{bookingDetails.hotelName || 'N/A'}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Room Number:
            </Typography>
            <Typography variant="body2">{bookingDetails.roomNumber || 'N/A'}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Room Type:
            </Typography>
            <Typography variant="body2">{bookingDetails.roomType || 'N/A'}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Booking Date:
            </Typography>
            <Typography variant="body2">
              {bookingDetails.bookingDateTime
                ? new Date(bookingDetails.bookingDateTime).toLocaleString()
                : 'N/A'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.primary" variant="body2" fontWeight="bold">
              Total Cost:
            </Typography>
            <Typography variant="body2">
              {bookingDetails.totalCost ? `$${bookingDetails.totalCost.toFixed(2)}` : 'N/A'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Payment Method:
            </Typography>
            <Typography variant="body2">{bookingDetails.paymentMethod || 'N/A'}</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Booking Status:
            </Typography>
            <Typography variant="body2" color="primary">
              {bookingDetails.bookingStatus || 'N/A'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Confirmation Number:
            </Typography>
            <Typography variant="body2">{bookingDetails.confirmationNumber || 'N/A'}</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Confirmation;
