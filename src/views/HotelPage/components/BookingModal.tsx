import React, { useState } from 'react';
import CustomModal from '../../../components/shared/Modal';
import { Box, Button } from '@mui/material';
import { RoomAvailabilityResultDto } from '../../../api/types';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import useCart from '../../../hooks/useCart';
import useSnackbar from '../../../hooks/useSnackbar';
type BookingModalProps = {
  open: boolean;
  onClose: () => void;
  room?: RoomAvailabilityResultDto;
};
const BookingModal = ({ open, onClose, room }: BookingModalProps) => {
  const navigate = useNavigate();
  const snackBar = useSnackbar();
  const cart = useCart();
  const [checkIn, setCheckIn] = useState<dayjs.Dayjs | null>(dayjs());
  const [checkOut, setCheckOut] = useState<dayjs.Dayjs | null>(dayjs().add(1, 'day'));

  const handleConfirm = () => {
    const checkInDate = checkIn?.format('YYYY-MM-DD');
    const checkOutDate = checkOut?.format('YYYY-MM-DD');
    cart.addToCart({ ...room, checkInDate: checkInDate, checkOutDate: checkOutDate });
    onClose();
    snackBar.showSnackBar({
      message: 'Room added to cart',
      anchorOrigin: { vertical: 'top', horizontal: 'center' },
      severity: 'success',
      autoHideDuration: 4000,
      action: (
        <Button
          color="inherit"
          size="small"
          onClick={() => {
            navigate('/cart');
            snackBar.hideSnackBar();
          }}>
          View Cart
        </Button>
      ),
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomModal open={open} onClose={onClose} title="Confirm Booking Dates">
        <Box display="flex" flexDirection="column" gap={2}>
          <DatePicker
            sx={{ width: '100%' }}
            label="Check-in"
            defaultValue={dayjs()}
            minDate={dayjs()}
            onChange={e => {
              setCheckIn(e);
            }}
          />
          <DatePicker
            sx={{ width: '100%' }}
            label="Check-out"
            defaultValue={dayjs().add(1, 'day')}
            minDate={dayjs().add(1, 'day')}
            onChange={e => {
              setCheckOut(e);
            }}
          />
          <Button variant="contained" onClick={handleConfirm} disabled={!checkIn || !checkOut}>
            Confirm
          </Button>
        </Box>
      </CustomModal>
    </LocalizationProvider>
  );
};
export default BookingModal;
