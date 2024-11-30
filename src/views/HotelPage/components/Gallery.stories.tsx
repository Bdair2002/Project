import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Gallery from './Gallery';
import { PhotoDto } from '../../../api/types';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

interface GalleryState {
  gallery: PhotoDto[];
  gallery_status: 'idle' | 'loading' | 'error';
  hotelId: number;
}

export const MockedState: GalleryState = {
  gallery: [
    { id: 1, url: 'https://picsum.photos/200/300' },
    { id: 2, url: 'https://picsum.photos/200/300' },
    { id: 3, url: 'https://picsum.photos/200/300' },
    { id: 4, url: 'https://picsum.photos/200/300' },
    { id: 5, url: 'https://picsum.photos/200/300' },
  ],
  gallery_status: 'idle',
  hotelId: 123,
};

const Mockstore = ({
  galleryState,
  children,
}: {
  galleryState: GalleryState;
  children: React.ReactNode;
}) => {
  const store = configureStore({
    reducer: {
      hotels: createSlice({
        name: 'hotel',
        initialState: galleryState,
        reducers: {},
      }).reducer,
    },
  });

  return <Provider store={store}>{children}</Provider>;
};

const meta: Meta<GalleryState> = {
  component: Gallery,
  title: 'Pages/HotelPageGallery',
  excludeStories: /.*MockedState$/,
};
export default meta;

type Story = StoryObj<GalleryState>;

export const Default: Story = {
  decorators: [Story => <Mockstore galleryState={MockedState}>{Story()}</Mockstore>],
};
