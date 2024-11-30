import { createSelector } from 'reselect';
import { RootState } from '../../redux/store/store';

const selectCartData = (state: RootState) => state.cart;

export const selectCart = createSelector([selectCartData], cart => ({
  ...cart,
}));

export const selectIsCartEmpty = createSelector(
  [selectCartData],
  cart => cart.bookings.length === 0,
);
