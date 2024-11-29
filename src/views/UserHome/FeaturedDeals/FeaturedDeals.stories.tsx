import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import FeaturedDeals from './FeaturedDeals';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { FeaturedDealDto } from '../../../api/types';

interface FeaturedDealsState {
  data: FeaturedDealDto[];
  status: string;
  error: string | null;
}

export const MockedState: FeaturedDealsState = {
  data: [
    {
      hotelId: 1,
      originalRoomPrice: 200,
      discount: 50,
      finalPrice: 150,
      cityName: 'New York',
      hotelName: 'Hotel 1',
      hotelStarRating: 5,
      title: 'Luxury Stay in New York',
      description: 'A luxurious hotel in the heart of New York.',
      roomPhotoUrl: 'image-url-1',
    },
    {
      hotelId: 2,
      originalRoomPrice: 150,
      discount: 30,
      finalPrice: 120,
      cityName: 'Los Angeles',
      hotelName: 'Hotel 2',
      hotelStarRating: 4,
      title: 'Comfortable Stay in Los Angeles',
      description: 'A comfortable hotel with all amenities in Los Angeles.',
      roomPhotoUrl: 'image-url-2',
    },
    {
      hotelId: 3,
      originalRoomPrice: 180,
      discount: 40,
      finalPrice: 140,
      cityName: 'San Francisco',
      hotelName: 'Hotel 3',
      hotelStarRating: 3,
      title: 'Affordable Stay in San Francisco',
      description: 'Great value for wmoney in San Francisco.',
      roomPhotoUrl: 'image-url-3',
    },
    {
      hotelId: 4,
      originalRoomPrice: 250,
      discount: 60,
      finalPrice: 190,
      cityName: 'Miami',
      hotelName: 'Hotel 4',
      hotelStarRating: 5,
      title: 'Exclusive Beachfront Stay in Miami',
      description: 'Enjoy the beach and luxury at this 5-star hotel in Miami.',
      roomPhotoUrl: 'image-url-4',
    },
  ],
  status: 'idle',
  error: null,
};

const Mockstore = ({
  featuredDealsState,
  children,
}: {
  featuredDealsState: FeaturedDealsState;
  children: React.ReactNode;
}) => {
  const store = configureStore({
    reducer: {
      featuredDeals: createSlice({
        name: 'featuredDeals',
        initialState: featuredDealsState,
        reducers: {},
      }).reducer,
    },
  });

  return <Provider store={store}>{children}</Provider>;
};

const meta: Meta<typeof FeaturedDeals> = {
  component: FeaturedDeals,
  title: 'Home/FeaturedDeals',
  decorators: [Story => <div style={{ margin: '3rem' }}>{Story()}</div>],
  excludeStories: /.*MockedState$/,
};
export default meta;

type Story = StoryObj<typeof FeaturedDeals>;

export const Default: Story = {
  decorators: [Story => <Mockstore featuredDealsState={MockedState}>{Story()}</Mockstore>],
};

export const Loading: Story = {
  decorators: [
    Story => (
      <Mockstore
        featuredDealsState={{
          ...MockedState,
          status: 'pending',
        }}>
        {Story()}
      </Mockstore>
    ),
  ],
};

export const ErrorState: Story = {
  decorators: [
    Story => (
      <Mockstore
        featuredDealsState={{
          ...MockedState,
          status: 'failure',
          error: 'Unable to fetch deals',
        }}>
        {Story()}
      </Mockstore>
    ),
  ],
};

export const Empty: Story = {
  decorators: [
    Story => (
      <Mockstore
        featuredDealsState={{
          ...MockedState,
          data: [],
        }}>
        {Story()}
      </Mockstore>
    ),
  ],
};
