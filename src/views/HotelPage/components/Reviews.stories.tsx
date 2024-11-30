import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ReviewsModal from '../../../components/shared/Modal';
import { ReviewDto } from '../../../api/types';
import { Button } from '@mui/material';
import { Box, Typography, List, ListItem, ListItemText, Divider, Rating } from '@mui/material';
const mockReviews: ReviewDto[] = [
  {
    reviewId: 1,
    customerName: 'John Doe',
    rating: 4.5,
    description: 'Great place to stay. Clean and spacious!',
  },
  {
    reviewId: 2,
    customerName: 'Jane Smith',
    rating: 3.0,
    description: 'The location is okay, but the room was a bit small.',
  },
  {
    reviewId: 3,
    customerName: 'Michael Johnson',
    rating: 5.0,
    description: 'Amazing experience! Will definitely come back.',
  },
];

const meta: Meta = {
  component: ReviewsModal,
  title: 'Components/ReviewsModal',
  argTypes: {
    open: { control: 'boolean' },
    onClose: { action: 'onClose' },
    reviews: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof ReviewsModal>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => alert('Modal closed'),
    children: 'This is the modal content.',
  },
  render: args => (
    <div>
      <Button onClick={() => args.onClose()}>Close Modal</Button>
      <ReviewsModal open={args.open} onClose={args.onClose}>
        <List>
          {mockReviews.map(review => (
            <React.Fragment key={review.reviewId}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography fontWeight="bold">
                        {review.customerName || 'Anonymous'}
                      </Typography>
                      <Rating value={review.rating ?? 0} precision={0.5} readOnly size="small" />
                    </Box>
                  }
                  secondary={review.description || 'No description provided.'}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </ReviewsModal>
    </div>
  ),
};
