import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, Paper } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Paper
      elevation={3}
      style={{
        backgroundColor: '#ffebee',
        borderLeft: '5px solid #f44336',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        margin: '16px 0',
        maxWidth: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
      <ErrorOutline style={{ color: '#f44336', marginRight: 12 }} />
      <Box>
        <Typography variant="h6" style={{ color: '#d32f2f' }}>
          Error
        </Typography>
        <Typography variant="body2" style={{ color: '#d32f2f', marginBottom: 8 }}>
          {message}
        </Typography>
      </Box>
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleClose}
        style={{
          marginLeft: 'auto',
          backgroundColor: '#ffebee',
        }}>
        <span style={{ fontSize: '20px', color: '#f44336' }}>×</span>
      </IconButton>
    </Paper>
  );
};

export default ErrorMessage;
