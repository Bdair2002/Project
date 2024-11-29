import React, { useState } from 'react';
import { Popover, Button, Typography, Box, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import GuestCount from './GuestCount';
type GuestsProps = {
  guests: {
    adults: number;
    children: number;
    rooms: number;
  };
  onCountChange: (name: string, count: number) => void;
};

const Guests = ({ guests, onCountChange }: GuestsProps) => {
  const { adults, children, rooms } = guests;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ height: '100%' }}>
      <Button
        variant="outlined"
        color="inherit"
        disableElevation
        onClick={handleClick}
        sx={{ height: '100%' }}
        fullWidth>
        {`${adults} Adult${adults > 1 ? 's' : ''}  , ${children} Children, ${rooms} Room${rooms > 1 ? 's' : ''}`}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <Stack gap={2} py={1} px={3}>
          <Typography variant="h6">Guests</Typography>
          <GuestCount
            disabled={adults === 1}
            label="Adults"
            count={adults}
            onCountChange={onCountChange}
          />
          <GuestCount
            disabled={children === 0}
            label="Children"
            count={children}
            onCountChange={onCountChange}
          />
          <GuestCount
            disabled={rooms === 1}
            label="Rooms"
            count={rooms}
            onCountChange={onCountChange}
          />
          <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: 50 }} fullWidth>
            Apply
          </Button>
        </Stack>
      </Popover>
    </Box>
  );
};

export default Guests;
