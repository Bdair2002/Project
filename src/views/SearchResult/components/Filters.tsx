import React, { useState, useEffect } from 'react';
import { Box, Typography, Slider, Divider, Rating, CircularProgress } from '@mui/material';
import useSearchFilters from '../../../hooks/useSearchFilters';
import { FilterAmenityDto, RoomAmenityDto } from '../../../api/types';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const roomTypes = [
  { name: 'Double' },
  { name: 'King Suite' },
  { name: 'Standard' },
  { name: 'Cabin' },
  { name: 'Ocean View' },
];

const Filters = () => {
  const searchFilters = useSearchFilters();
  const toggleButtonStyles = (amenity: RoomAmenityDto | RoomAmenityDto) => ({
    backgroundColor:
      amenity.name && searchFilters.filters.amenities.includes(amenity.name) ? 'primary.main' : '',
    '&.Mui-selected': {
      backgroundColor: 'primary.main',
      color: 'white',
    },
    '&.Mui-selected:hover': {
      backgroundColor: 'primary.main',
    },
  });
  useEffect(() => {
    searchFilters.getAmenities();
  }, []);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    searchFilters.applyFilters({ ...searchFilters.filters, priceRange: newValue as number[] });
  };

  const handleRatingChange = (rating: number) => {
    const updatedRatings = searchFilters.filters.starRating.includes(rating)
      ? searchFilters.filters.starRating.filter(r => r !== rating)
      : [...searchFilters.filters.starRating, rating];
    searchFilters.applyFilters({ ...searchFilters.filters, starRating: updatedRatings });
  };

  const handleRoomTypeChange = (event: React.MouseEvent<HTMLElement>, newRoomTypes: string[]) => {
    searchFilters.applyFilters({ ...searchFilters.filters, roomTypes: newRoomTypes });
  };

  const handleAmenityChange = (event: React.MouseEvent<HTMLElement>, newAmenities: string[]) => {
    searchFilters.applyFilters({ ...searchFilters.filters, amenities: newAmenities });
  };

  return (
    <Box
      sx={{
        width: '100%',
        padding: 2,
        borderRadius: 2,
        border: '1px solid #ccc',
      }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />

      {/* Price Range Filter */}
      <Typography color="textSecondary" variant="subtitle1" gutterBottom>
        Price Range
      </Typography>
      <Slider
        value={searchFilters.filters.priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={50}
        max={300}
        step={50}
      />
      <Typography>
        ${searchFilters.filters.priceRange[0]} - ${searchFilters.filters.priceRange[1]}
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      {/* Star Rating Filter */}
      <Typography color="textSecondary" variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
        Star Rating
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {[5, 4, 3, 2, 1].map(rating => (
          <Box
            key={rating}
            sx={{
              marginBottom: 1,
              cursor: 'pointer',
              border: '1px solid #666',
              backgroundColor: searchFilters.filters.starRating.includes(rating)
                ? 'primary.main'
                : '',

              borderRadius: '4px',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => handleRatingChange(rating)}>
            <Rating value={rating} readOnly size="small" />
          </Box>
        ))}
      </Box>
      <Divider sx={{ marginBottom: 2 }} />
      {/* Room Type Filter */}
      <Typography color="textSecondary" variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
        Room Type
      </Typography>
      <ToggleButtonGroup
        value={searchFilters.filters.roomTypes}
        onChange={handleRoomTypeChange}
        aria-label="Room types"
        sx={{ flexWrap: 'wrap', gap: 1, marginBottom: 1.5 }}>
        {roomTypes.map(room => (
          <ToggleButton
            sx={toggleButtonStyles(room)}
            disableRipple
            key={room.name}
            value={room.name}
            aria-label={room.name}>
            {room.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Divider sx={{ marginBottom: 2 }} />
      {/* Amenities Filter */}
      <Typography color="textSecondary" variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
        Amenities
      </Typography>
      {searchFilters.amenities ? (
        <ToggleButtonGroup
          value={searchFilters.filters.amenities}
          onChange={handleAmenityChange}
          aria-label="Amenities"
          sx={{ flexWrap: 'wrap', gap: 1 }}>
          {searchFilters.amenities.map(amenity => (
            <ToggleButton
              sx={toggleButtonStyles(amenity)}
              key={amenity.name}
              disableRipple
              value={amenity.name || ''}
              aria-label={amenity.name || ''}>
              {amenity.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      ) : (
        <CircularProgress size={24} />
      )}
    </Box>
  );
};

export default Filters;
