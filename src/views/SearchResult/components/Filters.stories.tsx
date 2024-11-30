import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Filters from './Filters';
import { RoomAmenityDto } from '../../../api/types';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

import { FiltersState } from '../../../redux/slices/searchResultsSlice';
type StoryFilterState = {
  filters: FiltersState;
  status: string;
  amenities: RoomAmenityDto[] | null;
};
export const MockedState: StoryFilterState = {
  filters: {
    priceRange: [50, 300],
    roomTypes: [],
    starRating: [],
    amenities: ['Free Wi-Fi', 'Free parking', 'Breakfast included'],
  },
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
  status: 'idle',
};

const Mockstore = ({
  filtersState,
  children,
}: {
  filtersState: StoryFilterState;
  children: React.ReactNode;
}) => {
  const store = configureStore({
    reducer: {
      searchResults: createSlice({
        name: 'searchResults',
        initialState: filtersState,
        reducers: {},
      }).reducer,
    },
  });

  return <Provider store={store}>{children}</Provider>;
};

const meta: Meta<StoryFilterState> = {
  component: Filters,
  title: 'Components/Filters',
  excludeStories: /.*MockedState$/,
};
export default meta;

type Story = StoryObj<StoryFilterState>;

export const Default: Story = {
  decorators: [Story => <Mockstore filtersState={MockedState}>{Story()}</Mockstore>],
};
export const LoadingAmenities: Story = {
  decorators: [
    Story => (
      <Mockstore
        filtersState={{
          ...MockedState,
          amenities: null,
        }}>
        {Story()}
      </Mockstore>
    ),
  ],
};
export const SelectedFilters: Story = {
  decorators: [
    Story => (
      <Mockstore
        filtersState={{
          ...MockedState,
          filters: {
            priceRange: [50, 300],
            roomTypes: ['Single', 'Double'],
            starRating: [3, 4],
            amenities: ['Free Wi-Fi'],
          },
        }}>
        {Story()}
      </Mockstore>
    ),
  ],
};
