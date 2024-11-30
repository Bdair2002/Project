import React, { FC } from 'react';
import {
  Box,
  Typography,
  Modal,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Rating,
} from '@mui/material';
import { ReviewDto } from '../../../api/types';

interface ReviewsModalProps {
  open: boolean;
  onClose: () => void;
  reviews: ReviewDto[];
}
import CustomModal from '../../../components/shared/Modal';

const ReviewsModal: FC<ReviewsModalProps> = ({ open, onClose, reviews }) => {
  return (
    <CustomModal open={open} onClose={onClose} title="Reviews">
      {reviews.length === 0 ? (
        <Typography>No reviews available.</Typography>
      ) : (
        <List>
          {reviews.map(review => (
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
      )}
    </CustomModal>
  );
};

export default ReviewsModal;
