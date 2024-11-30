import { useDispatch, useSelector } from 'react-redux';

import {
  addToCart,
  removeFromCart,
  RoomForBooking,
  clearCart,
  checkoutRequest,
} from '../redux/slices/cartSlice';
import { useCallback } from 'react';
import { BookingRequest } from '../api/types';
import { selectCart } from '../selectors/CartSelectors/CartSelector';
const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const addToCartHandler = useCallback(
    (booking: RoomForBooking) => {
      dispatch(addToCart(booking));
    },
    [dispatch],
  );
  const removeFromCartHandler = useCallback(
    (booking: RoomForBooking) => {
      dispatch(removeFromCart({ booking }));
    },
    [dispatch],
  );
  const clearCartHandler = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  const confirmBookingHandler = useCallback(
    (booking: BookingRequest) => {
      dispatch(checkoutRequest(booking));
    },
    [dispatch],
  );
  return {
    ...cart,
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
    clearCart: clearCartHandler,
    confirmBooking: confirmBookingHandler,
  };
};
export default useCart;
