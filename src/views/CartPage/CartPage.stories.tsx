import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import CartPage from '.';
import { CartState } from '../../redux/slices/cartSlice';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

export const MockedState: CartState = {
  bookings: [
    {
      availability: true,
      capacityOfAdults: 2,
      capacityOfChildren: 1,
      checkInDate: '2022-09-30',
      checkOutDate: '2022-10-01',
      price: 100,
      roomAmenities: [
        {
          name: 'Wifi',
          description: 'Free wifi',
        },
        {
          name: 'Breakfast',
          description: 'Free breakfast',
        },
      ],
      roomId: 1,
      roomNumber: 101,
      roomPhotoUrl: 'https://via.placeholder.com/150',
      roomType: 'Single',
    },
  ],
  status: 'idle',
  bookingInfo_status: 'idle',
  bookingDetails: {},
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
  title: 'Pages/CartPage',
  excludeStories: /.*MockedState$/,
};
export default meta;

type Story = StoryObj<CartState>;

export const Default: Story = {
  decorators: [Story => <Mockstore CartState={MockedState}>{Story()}</Mockstore>],
};
