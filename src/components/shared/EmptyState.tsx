import React from 'react';

import { Box, Typography, Button, Paper } from '@mui/material';
import { HourglassEmpty } from '@mui/icons-material';

type EmptyStateProps = {
  message?: string;
  buttonText?: string;
  onButtonClick?: () => void;
};

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <Paper
      elevation={3}
      style={{
        padding: '40px 24px',
        textAlign: 'center',
        backgroundColor: '#f7f7f7',
        borderRadius: '8px',
        maxWidth: 600,
        margin: 'auto',
        marginTop: '80px',
      }}>
      <HourglassEmpty
        style={{
          fontSize: '80px',
          color: '#cccccc',
          marginBottom: '20px',
        }}
      />
      <Typography variant="h5" style={{ color: '#555555', marginBottom: '16px' }}>
        {message || 'No items to display'}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {}}
        style={{ padding: '10px 20px' }}>
        Go Back
      </Button>
    </Paper>
  );
};

export default EmptyState;
