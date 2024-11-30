import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CartPage from '.';
import { CartState } from '../../redux/slices/cartSlice';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

export const MockedState: CartState = {
  bookings: [],
  status: 'idle',
  bookingInfo_status: 'idle',
  bookingDetails: {
    bookingDateTime: '2021-10-10T10:10:10',
    bookingStatus: 'Succeess',
    confirmationNumber: '123456',
    customerName: 'John Doe',
    hotelName: 'Hotel California',
    paymentMethod: 'Credit Card',
    roomNumber: '123',
    roomType: 'Suite',
    totalCost: 1234.56,
  },
};

const Mockstore = ({
  CartState,
  children,
}: {
  CartState: CartState;
  children: React.ReactNode;
}) => {
  const store = configureStore({
    reducer: {
      cart: createSlice({
        name: 'cart',
        initialState: CartState,
        reducers: {},
      }).reducer,
    },
  });

  return <Provider store={store}>{children}</Provider>;
};

const meta: Meta<CartState> = {
  component: CartPage,
  title: 'Pages/ConfirmationPage',
  excludeStories: /.*MockedState$/,
};
export default meta;

type Story = StoryObj<CartState>;

export const Default: Story = {
  decorators: [Story => <Mockstore CartState={MockedState}>{Story()}</Mockstore>],
};
