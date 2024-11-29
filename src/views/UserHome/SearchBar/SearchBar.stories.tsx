import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SearchBox from './SearchBar';
import { Provider } from 'react-redux';
import { QueryParamsType } from '../../../api/types';
import { configureStore, createSlice } from '@reduxjs/toolkit';
interface SearchResultsState {
  queryParams: QueryParamsType;
}
const mockeState: SearchResultsState = {
  queryParams: {
    cityName: 'New York',
    checkIn: new Date().toISOString(),
    checkOut: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
    adults: 2,
    children: 0,
    rooms: 1,
  },
};

const Mockstore = ({
  SearchResultsState,
  children,
}: {
  SearchResultsState: SearchResultsState;
  children: React.ReactNode;
}) => {
  const store = configureStore({
    reducer: {
      searchResults: createSlice({
        name: 'searchResults',
        initialState: SearchResultsState,
        reducers: {},
      }).reducer,
    },
  });

  return <Provider store={store}>{children}</Provider>;
};

const meta: Meta<typeof SearchBox> = {
  title: 'Home/SearchBar',
  component: SearchBox,
};

export default meta;

type Story = StoryObj<typeof SearchBox>;

export const Default: Story = {
  decorators: [Story => <Mockstore SearchResultsState={mockeState}>{Story()}</Mockstore>],
};
