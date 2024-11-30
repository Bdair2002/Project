import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SearchResults from './SearchResults';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { SearchResultsState } from '../../../redux/slices/searchResultsSlice';

export const MockedState: SearchResultsState = {
  filters: {
    priceRange: [50, 300],
    roomTypes: [],
    starRating: [],
    amenities: [],
  },
  searchResults: [
    {
      hotelId: 1,
      hotelName: 'The Grand Palace',
      amenities: [
        {
          id: 0,
          name: 'Free Wi-Fi',
          description: 'Free Wi-Fi is available in all rooms.',
        },
        {
          id: 1,
          name: 'Free parking',
          description: 'Free parking is available for all guests.',
        },
      ],
      cityName: 'Paris',
      discount: 50,
      latitude: 48.8566,
      longitude: 2.3522,
      roomPhotoUrl: 'https://via.placeholder.com/300x180.png?text=The+Grand+Palace',
      roomPrice: 200,
      roomType: 'Deluxe',
    },
    {
      hotelId: 2,
      hotelName: 'Sunny Beach Resort',
      amenities: [
        {
          id: 0,
          name: 'Free Wi-Fi',
          description: 'Free Wi-Fi is available in all rooms.',
        },
        {
          id: 1,
          name: 'Free parking',
          description: 'Free parking is available for all guests.',
        },
      ],
      cityName: 'Miami',
      discount: 30,
      latitude: 25.7617,
      longitude: -80.1918,
      roomPhotoUrl: 'https://via.placeholder.com/300x180.png?text=Sunny+Beach+Resort',
      roomPrice: 150,
      roomType: 'Standard',
    },
    {
      hotelId: 3,
      hotelName: 'Mountain View Lodge',
      amenities: [
        {
          id: 0,
          name: 'Free Wi-Fi',
          description: 'Free Wi-Fi is available in all rooms.',
        },
        {
          id: 1,
          name: 'Free parking',
          description: 'Free parking is available for all guests.',
        },
      ],
      cityName: 'Denver',
      discount: 40,
      latitude: 39.7392,
      longitude: -104.9903,
      roomPhotoUrl: 'https://via.placeholder.com/300x180.png?text=Mountain+View+Lodge',
      roomPrice: 180,
      roomType: 'Standard',
    },
  ],
  status: 'idle',
  error: null,
  favorites: [1],
  sortOption: 'Relevance',
  amenities: null,
};

const Mockstore = ({
  state,
  children,
}: {
  state: SearchResultsState;
  children: React.ReactNode;
}) => {
  const store = configureStore({
    reducer: {
      searchResults: createSlice({
        name: 'searchResults',
        initialState: state,
        reducers: {},
      }).reducer,
    },
  });

  return <Provider store={store}>{children}</Provider>;
};

const meta: Meta<SearchResultsState> = {
  component: SearchResults,
  title: 'Pages/SearchResultsComponent',
  excludeStories: /.*MockedState$/,
};
export default meta;

type Story = StoryObj<SearchResultsState>;

export const Default: Story = {
  decorators: [Story => <Mockstore state={MockedState}>{Story()}</Mockstore>],
};

export const Loading: Story = {
  decorators: [
    Story => (
      <Mockstore
        state={{
          ...MockedState,
          searchResults: [],
          status: 'loading',
        }}>
        {Story()}
      </Mockstore>
    ),
  ],
};

export const NoResults: Story = {
  decorators: [
    Story => (
      <Mockstore
        state={{
          ...MockedState,
          searchResults: [],
          status: 'idle',
        }}>
        {Story()}
      </Mockstore>
    ),
  ],
};

export const WithError: Story = {
  decorators: [
    Story => (
      <Mockstore
        state={{
          ...MockedState,
          searchResults: [],
          error: 'Failed to fetch search results',
          status: 'idle',
        }}>
        {Story()}
      </Mockstore>
    ),
  ],
};

export const FavoritesOnly: Story = {
  decorators: [
    Story => (
      <Mockstore
        state={{
          ...MockedState,
          searchResults: MockedState.searchResults.filter(result =>
            MockedState.favorites.includes(result.hotelId || 0),
          ),
        }}>
        {Story()}
      </Mockstore>
    ),
  ],
};
