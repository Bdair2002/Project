// src/components/GuestCount.tsx
import React from 'react';
import { Button, Typography, Box, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type GuestCountProps = {
  label: string;
  count: number;
  disabled?: boolean;
  onCountChange: (name: string, count: number) => void;
};

const GuestCount = ({ label, count, disabled, onCountChange }: GuestCountProps) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography flex={1} variant="body1">
        {label}
      </Typography>
      <Button
        onClick={() => onCountChange(label.toLowerCase(), count - 1)}
        disabled={disabled}
        variant="text">
        <RemoveIcon />
      </Button>
      <Typography variant="body1">{count}</Typography>
      <Button onClick={() => onCountChange(label.toLowerCase(), count + 1)} variant="text">
        <AddIcon />
      </Button>
    </Stack>
  );
};

export default GuestCount;
