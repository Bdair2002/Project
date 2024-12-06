import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Box, Rating } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelIcon from '@mui/icons-material/Hotel';
import { HotelWithoutRooms } from '../../../api/types';
import { useNavigate } from 'react-router-dom';
interface HotelCardProps {
  hotel: HotelWithoutRooms;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        margin: 2,
        borderRadius: 3,
        boxShadow: 3,
        '&:hover': {
          boxShadow: 6,
          transform: 'scale(1.02)',
          transition: '0.3s ease-in-out',
        },
      }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          {hotel.name || 'Unnamed Hotel'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
          {hotel.description || 'No description available'}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <HotelIcon sx={{ color: 'primary.main', marginRight: 1 }} />
            <Typography variant="subtitle1">{hotel.hotelType || 'Unknown'}</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating
              name="hotel-rating"
              value={hotel.starRating || 0}
              precision={0.5}
              readOnly
              size="small"
              sx={{ marginRight: 1 }}
            />
            <Typography variant="subtitle1">{hotel.starRating || 'Unrated'} Stars</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon sx={{ color: 'secondary.main', marginRight: 1 }} />
            <Typography variant="subtitle1">
              Location: {hotel.latitude?.toFixed(2) || 'N/A'},{' '}
              {hotel.longitude?.toFixed(2) || 'N/A'}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-start', paddingBottom: 2 }}>
        <Button
          onClick={() => navigate(`/hotel/${hotel.id}`)}
          size="small"
          variant="contained"
          color="primary"
          sx={{ textTransform: 'none' }}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default HotelCard;
