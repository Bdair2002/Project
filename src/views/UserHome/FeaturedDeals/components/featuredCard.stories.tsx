import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import HotelCard from './featuredCards';
import { FeaturedDealDto } from '../../../../api/types';

const meta: Meta<typeof HotelCard> = {
  title: 'Components/HotelCard',
  component: HotelCard,
};
export default meta;

type Story = StoryObj<typeof HotelCard>;

export const Default: Story = {
  args: {
    deal: {
      hotelId: 1,
      title: 'Luxury Stay in New York',
      description: 'Enjoy a luxurious stay at Grand Hotel with a special discount.',
      cityName: 'New York',
      hotelName: 'Grand Hotel',
      hotelStarRating: 5,
      originalRoomPrice: 300.0,
      finalPrice: 250.0,
      roomPhotoUrl: 'https://via.placeholder.com/400x300',
    } as FeaturedDealDto,
  },
};

export const WithoutImage: Story = {
  args: {
    deal: {
      hotelId: 2,
      title: 'Affordable Stay in Chicago',
      description: 'Budget-friendly hotel in the heart of Chicago.',
      cityName: 'Chicago',
      hotelName: 'Budget Inn',
      hotelStarRating: 3,
      originalRoomPrice: 150.0,
      finalPrice: 120.0,
      roomPhotoUrl: '', // No image provided
    } as FeaturedDealDto,
  },
};
