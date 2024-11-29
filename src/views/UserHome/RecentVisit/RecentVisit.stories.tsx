import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import RecentlyVisited from './RecentVisit';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { RecentHotelResultDto } from '../../../api/types';
import RecentVisit from '.';

interface RecentVisitState {
  data: RecentHotelResultDto[];
  status: string;
  error: string | null;
}

const mockRecentHotels: RecentVisitState = {
  data: [
    {
      hotelId: 1,
      hotelName: 'The Grand Palace',
      starRating: 5,
      visitDate: '2024-11-01T14:00:00Z',
      cityName: 'Paris',
      thumbnailUrl: 'https://via.placeholder.com/300x180.png?text=The+Grand+Palace',
      priceLowerBound: 200,
      priceUpperBound: 500,
    },
    {
      hotelId: 2,
      hotelName: 'Sunny Beach Resort',
      starRating: 4,
      visitDate: '2024-10-28T11:30:00Z',
      cityName: 'Miami',
      thumbnailUrl: 'https://via.placeholder.com/300x180.png?text=Sunny+Beach+Resort',
      priceLowerBound: 150,
      priceUpperBound: 300,
    },
    {
      hotelId: 3,
      hotelName: 'Mountain View Lodge',
      starRating: 3,
      visitDate: '2024-09-15T09:15:00Z',
      cityName: 'Denver',
      thumbnailUrl: 'https://via.placeholder.com/300x180.png?text=Mountain+View+Lodge',
      priceLowerBound: 100,
      priceUpperBound: 200,
    },
    {
      hotelId: 5,
      hotelName: 'Ocean Breeze Inn',
      starRating: 4,
      visitDate: '2024-11-05T20:00:00Z',
      cityName: 'Sydney',
      thumbnailUrl: 'https://via.placeholder.com/300x180.png?text=Ocean+Breeze+Inn',
      priceLowerBound: 180,
      priceUpperBound: 400,
    },
  ],
  status: 'idle',
  error: null,
};
const mockUser = {
  user_id: 123,
  name: 'John Doe',
};

const Mockstore = ({
  RecentVisitState,
  children,
}: {
  RecentVisitState: RecentVisitState;
  children: React.ReactNode;
}) => {
  const store = configureStore({
    reducer: {
      recents: createSlice({
        name: 'recentVisit',
        initialState: RecentVisitState,
        reducers: {},
      }).reducer,
      auth: createSlice({
        name: 'user',
        initialState: mockUser,
        reducers: {},
      }).reducer,
    },
  });

  return <Provider store={store}>{children}</Provider>;
};

const meta: Meta<typeof RecentVisit> = {
  component: RecentlyVisited,
  title: 'Home/RecentlyVisited',
  excludeStories: /.*MockedState$/,
};
export default meta;

type Story = StoryObj<typeof RecentVisit>;

export const Default: Story = {
  decorators: [Story => <Mockstore RecentVisitState={mockRecentHotels}>{Story()}</Mockstore>],
};

export const Loading: Story = {
  decorators: [
    Story => (
      <Mockstore
        RecentVisitState={{
          ...mockRecentHotels,
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
        RecentVisitState={{
          ...mockRecentHotels,
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
        RecentVisitState={{
          ...mockRecentHotels,
          data: [],
        }}>
        {Story()}
      </Mockstore>
    ),
  ],
};
