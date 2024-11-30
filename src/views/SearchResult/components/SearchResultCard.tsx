import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Rating,
  Chip,
  IconButton,
  Badge,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from 'react-router-dom';
import { SearchResultDto } from '../../../api/types';

interface HotelCardProps {
  hotel: SearchResultDto;
  isFavorite: boolean;
  onFavoriteToggle: (hotelId: number) => void;
  onClick: (hotelId: number) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, isFavorite, onFavoriteToggle, onClick }) => {
  return (
    <Card elevation={3} sx={{ position: 'relative', width: '100%' }}>
      <IconButton
        onClick={() => onFavoriteToggle(hotel.hotelId || 0)}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 2,
          color: isFavorite ? 'error.main' : '#313131',
        }}>
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
      {hotel.discount && (
        <Badge
          badgeContent={`-${hotel.discount}% OFF`}
          color="error"
          sx={{
            position: 'absolute',
            top: '2.2rem',
            left: '2.5rem',
            zIndex: 2,
            transform: 'rotate(-45deg)',
            '& .MuiBadge-badge': {
              fontSize: '1rem',
              height: '1.5rem',
              width: '10rem',
              borderRadius: '0',
            },
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        />
      )}
      <CardMedia
        component="img"
        height="200"
        image={hotel.roomPhotoUrl || 'https://via.placeholder.com/300'}
        alt={`${hotel.hotelName} room`}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          {hotel.hotelName || 'Unnamed Hotel'}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          <LocationOnIcon sx={{ fontSize: 24 }} /> {hotel.cityName || 'Unknown City'}
        </Typography>
        <Box display="flex" alignItems="center" my={1} justifyContent="space-between">
          <Rating value={hotel.starRating ?? 0} readOnly precision={0.5} />
          <Typography variant="subtitle2" sx={{ marginY: 1 }}>
            <Chip
              label={hotel.roomType || 'N/A'}
              color="primary"
              size="small"
              sx={{ marginRight: 1 }}
            />
          </Typography>
        </Box>
        <Typography variant="h6" color="primary" fontWeight="bold" sx={{ marginY: 1 }}>
          ${hotel.roomPrice?.toFixed(2) || 'N/A'}/Night
        </Typography>
        {hotel.amenities && hotel.amenities.length > 0 && (
          <Box sx={{ marginTop: 2 }}>
            {hotel.amenities.map((amenity, index) => (
              <Chip
                key={index}
                label={amenity.name}
                color="primary"
                variant="outlined"
                size="small"
                sx={{ marginBottom: 1 }}
              />
            ))}
          </Box>
        )}
      </CardContent>
      <Box sx={{ padding: 2 }}>
        <Button
          onClick={() => onClick(hotel.hotelId || 0)}
          variant="contained"
          color="primary"
          fullWidth
          component={Link}
          to={`/hotel/${hotel.hotelId}`}>
          More Details &gt;
        </Button>
      </Box>
    </Card>
  );
};

export default HotelCard;
