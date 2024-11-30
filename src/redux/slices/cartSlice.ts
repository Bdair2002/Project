import { createSlice } from '@reduxjs/toolkit';

import { PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import { RoomAvailabilityResultDto, BookingDetailsDto } from '../../api/types';
export interface RoomForBooking extends RoomAvailabilityResultDto {
  checkInDate?: string;
  checkOutDate?: string;
}
export interface CartState {
  bookings: RoomForBooking[];
  status: 'idle' | 'loading' | 'failure';
  bookingInfo_status: 'idle' | 'loading' | 'failure';
  bookingDetails: BookingDetailsDto;
}
interface ActionPayload {
  booking: RoomForBooking;
}
const initialState: CartState = {
  bookings: Cookies.get('bookings') ? JSON.parse(Cookies.get('bookings') as string) : [],
  status: 'idle',
  bookingInfo_status: 'idle',
  bookingDetails: localStorage.getItem('bookingDetails')
    ? JSON.parse(localStorage.getItem('bookingDetails') as string)
    : {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<RoomForBooking>) => {
      state.bookings.push(action.payload);
      Cookies.set('bookings', JSON.stringify(state.bookings));
    },
    removeFromCart: (state, action: PayloadAction<ActionPayload>) => {
      state.bookings = state.bookings.filter(
        booking => booking.roomId !== action.payload.booking.roomId,
      );
      Cookies.set('bookings', JSON.stringify(state.bookings));
    },
    clearCart: state => {
      state.bookings = [];
      Cookies.remove('bookings');
    },
    checkoutRequest: (state, action) => {
      state.status = 'loading';
    },
    checkoutSuccess: state => {
      state.status = 'idle';
      state.bookings = [];
      Cookies.remove('bookings');
    },
    checkoutFailure: state => {
      state.status = 'failure';
    },
    fetchBookingInfoRequest: (state, action: PayloadAction<number>) => {
      state.bookingInfo_status = 'loading';
      state.bookingDetails = {};
      localStorage.removeItem('bookingDetails');
    },
    fetchBookingInfoSuccess: (state, action: PayloadAction<BookingDetailsDto>) => {
      state.bookingInfo_status = 'idle';
      state.bookingDetails = action.payload;
      localStorage.setItem('bookingDetails', JSON.stringify(action.payload));
    },
    fetchBookingInfoFailure: state => {
      state.bookingInfo_status = 'failure';
      localStorage.removeItem('bookingDetails');
      state.bookingDetails = {};
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  checkoutFailure,
  checkoutRequest,
  checkoutSuccess,
  fetchBookingInfoFailure,
  fetchBookingInfoRequest,
  fetchBookingInfoSuccess,
} = cartSlice.actions;

export default cartSlice.reducer;
