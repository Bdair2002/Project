import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import StarRatingPieChart from './StarRatingPieChart';
import { HotelDto } from '../../../../api/types';

const mockHotels: HotelDto[] = [
  { id: 1, hotelName: 'Hotel One', starRating: 5 },
  { id: 2, hotelName: 'Hotel Two', starRating: 4 },
  { id: 3, hotelName: 'Hotel Three', starRating: 3 },
  { id: 4, hotelName: 'Hotel Four', starRating: 3 },
  { id: 5, hotelName: 'Hotel Five', starRating: 2 },
  { id: 6, hotelName: 'Hotel Six', starRating: 1 },
  { id: 7, hotelName: 'Hotel Seven', starRating: 1 },
  { id: 8, hotelName: 'Hotel Eight', starRating: 0 },
];

const meta: Meta = {
  title: 'Pages/AdminPage/StarRatingPieChart',
  component: StarRatingPieChart,
  argTypes: {
    hotelData: {
      description: 'List of hotels with star ratings.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof StarRatingPieChart>;

export const Default: Story = {
  args: {
    hotelData: mockHotels,
  },
};

export const AllFiveStars: Story = {
  args: {
    hotelData: Array(10)
      .fill(0)
      .map((_, i) => ({ id: i + 1, hotelName: `Hotel ${i + 1}`, starRating: 5 })),
  },
};

export const MixedRatings: Story = {
  args: {
    hotelData: [
      { id: 1, hotelName: 'Hotel A', starRating: 5 },
      { id: 2, hotelName: 'Hotel B', starRating: 3 },
      { id: 3, hotelName: 'Hotel C', starRating: 1 },
      { id: 4, hotelName: 'Hotel D', starRating: 2 },
      { id: 5, hotelName: 'Hotel E', starRating: 4 },
    ],
  },
};

export const NoRatings: Story = {
  args: {
    hotelData: Array(5)
      .fill(0)
      .map((_, i) => ({ id: i + 1, hotelName: `Hotel ${i + 1}`, starRating: undefined })),
  },
};
