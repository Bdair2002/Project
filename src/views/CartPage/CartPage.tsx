import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Delete as DeleteIcon } from '@mui/icons-material';
import useCart from '../../hooks/useCart';
import { default as CartItem } from '../../components/shared/AvailableRooms';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import PaymentForm from './components/PaymentForm';
import { selectIsCartEmpty } from '../../selectors/CartSelectors/CartSelector';
import { useSelector } from 'react-redux';
const CartPage = () => {
  const { user } = useAuth();
  const isEmpty = useSelector(selectIsCartEmpty);
  const cart = useCart();
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Typography variant="h3" sx={{ marginBottom: 2, marginTop: 2, marginLeft: 2 }}>
          Checkout 🛒
        </Typography>
      </Grid>
      {isEmpty ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}>
          <Typography variant="h5" color="textSecondary" align="center">
            Your cart is empty. Book a room to check it out!
          </Typography>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => navigate('/search')}>
            <Typography>Go to Search</Typography>
          </Button>
        </Box>
      ) : (
        <>
          <Grid sx={{ padding: 2 }} size={{ md: 6, xs: 12 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ marginLeft: 2 }}>
                Cart Details
              </Typography>
              <Button
                size="small"
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={cart.clearCart}>
                Clear Cart
              </Button>
            </Box>
            <Divider sx={{ m: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography color="textSecondary" variant="h6" sx={{ marginLeft: 2 }}>
                Total Rooms
              </Typography>
              <Typography color="textSecondary" variant="h6" sx={{ marginRight: 2 }}>
                {cart.bookings.length}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography color="textSecondary" variant="h6" sx={{ marginLeft: 2 }}>
                Total Price
              </Typography>
              <Typography color="textSecondary" variant="h6" sx={{ marginRight: 2 }}>
                $
                {cart.bookings.reduce((acc, curr) => {
                  return acc + (curr.price ?? 0);
                }, 0)}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography color="textSecondary" variant="h6" sx={{ marginLeft: 2 }}>
                Your Name
              </Typography>
              <Typography color="textSecondary" variant="h6" sx={{ marginRight: 2 }}>
                {`${user?.given_name} ${user?.family_name}`}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography color="textSecondary" variant="h6" sx={{ marginLeft: 2 }}>
                Check In
              </Typography>
              <Typography color="textSecondary" variant="h6" sx={{ marginRight: 2 }}>
                {cart.bookings[0].checkInDate}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography color="textSecondary" variant="h6" sx={{ marginLeft: 2 }}>
                Check Out
              </Typography>
              <Typography color="textSecondary" variant="h6" sx={{ marginRight: 2 }}>
                {cart.bookings[0].checkOutDate}
              </Typography>
            </Box>
            <Divider sx={{ m: 1 }} />
            <Typography variant="h5" sx={{ marginLeft: 2, marginTop: 2, marginBottom: 2 }}>
              Payment Details
            </Typography>
            <PaymentForm />
          </Grid>
          <Grid sx={{ position: 'relative' }} size={{ md: 6, xs: 12 }}>
            <CartItem rooms={cart.bookings} page="cartPage" />
            <Divider sx={{ position: 'absolute', top: 0, left: -20 }} orientation="vertical" />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default CartPage;
