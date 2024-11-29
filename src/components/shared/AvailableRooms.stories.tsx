import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import AvailableRooms from './AvailableRooms';
import { RoomAvailabilityResultDto } from '../../api/types';
import { Grid, Box } from '@mui/material';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

const mockRooms: RoomAvailabilityResultDto[] = [
  {
    roomId: 1,
    roomType: 'Single Room',
    roomNumber: 101,
    price: 120,
    capacityOfAdults: 1,
    capacityOfChildren: 0,
    roomPhotoUrl: 'https://picsum.photos/200/300?room1',
    roomAmenities: [
      { name: 'WiFi', description: 'Free WiFi' },
      { name: 'AC', description: 'Air-conditioned' },
    ],
  },
  {
    roomId: 2,
    roomType: 'Double Room',
    roomNumber: 102,
    price: 180,
    capacityOfAdults: 2,
    capacityOfChildren: 2,
    roomPhotoUrl: 'https://picsum.photos/200/300?room2',
    roomAmenities: [
      { name: 'WiFi', description: 'Free WiFi' },
      { name: 'AC', description: 'Air-conditioned' },
      { name: 'TV', description: 'Flat-screen TV' },
    ],
  },
];

const Mockstore = ({ children }: { children: React.ReactNode }) => {
  const store = configureStore({
    reducer: {
      cart: createSlice({
        name: 'cart',
        initialState: {
          bookings: [
            { roomId: 1, checkIn: '2022-01-01', checkOut: '2022-01-02' },
            { roomId: 2, checkIn: '2022-01-01', checkOut: '2022-01-02' },
          ],
        },
        reducers: {},
      }).reducer,
    },
  });

  return <Provider store={store}>{children}</Provider>;
};
const meta: Meta = {
  component: AvailableRooms,
  title: 'Components/AvailableRooms',
};

export default meta;

type Story = StoryObj<typeof AvailableRooms>;

export const Default: Story = {
  decorators: [Story => <Mockstore>{Story()}</Mockstore>],
  args: {
    rooms: mockRooms,
  },
};
export const CartPageRooms: Story = {
  decorators: [Story => <Mockstore>{Story()}</Mockstore>],
  args: {
    rooms: mockRooms,
    page: 'cartPage',
  },
};
