import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import TrendingDestinations from './Trending';
import { Destination } from '../../../api/types';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

interface TrendingDestinationsState {
  data: Destination[];
  status: string;
  error: string | null;
}

export const MockedState: TrendingDestinationsState = {
  data: [
    {
      cityId: 1,
      cityName: 'Paris',
      countryName: 'France',
      description: 'The City of Light, a beacon of romance and art.',
      thumbnailUrl: 'https://via.placeholder.com/400/?paris',
    },
    {
      cityId: 2,
      cityName: 'Tokyo',
      countryName: 'Japan',
      description: 'A vibrant metropolis blending tradition and modernity.',
      thumbnailUrl: 'https://via.placeholder.com/400/?tokyo',
    },
    {
      cityId: 3,
      cityName: 'New York',
      countryName: 'USA',
      description: 'The city that never sleeps, full of life and culture.',
      thumbnailUrl: 'https://via.placeholder.com/400/?new-york',
    },
    {
      cityId: 4,
      cityName: 'Dubai',
      countryName: 'UAE',
      description: 'A luxurious paradise in the desert.',
      thumbnailUrl: 'https://via.placeholder.com/400/?dubai',
    },
    {
      cityId: 5,
      cityName: 'Sydney',
      countryName: 'Australia',
      description: 'Home of the iconic Opera House and stunning beaches.',
      thumbnailUrl: 'https://via.placeholder.com/400/?sydney',
    },
  ],
  status: 'idle',
  error: null,
};

const Mockstore = ({
  trendingState,
  children,
}: {
  trendingState: TrendingDestinationsState;
  children: React.ReactNode;
}) => {
  const store = configureStore({
    reducer: {
      trending: createSlice({
        name: 'trending',
        initialState: trendingState,
        reducers: {},
      }).reducer,
    },
  });

  return <Provider store={store}>{children}</Provider>;
};

const meta: Meta<typeof TrendingDestinations> = {
  component: TrendingDestinations,
  title: 'Home/TrendingDestinations',
  decorators: [Story => <div style={{ margin: '3rem' }}>{Story()}</div>],
  excludeStories: /.*MockedState$/,
};
export default meta;

type Story = StoryObj<typeof TrendingDestinations>;

export const Default: Story = {
  decorators: [Story => <Mockstore trendingState={MockedState}>{Story()}</Mockstore>],
};

export const Loading: Story = {
  decorators: [
    Story => (
      <Mockstore
        trendingState={{
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
        trendingState={{
          ...MockedState,
          status: 'failure',
          error: 'Unable to fetch trending destinations',
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
        trendingState={{
          ...MockedState,
          data: [],
        }}>
        {Story()}
      </Mockstore>
    ),
  ],
};
