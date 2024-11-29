import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Rating } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import EventIcon from '@mui/icons-material/Event';
import { RecentHotelResultDto } from '../../../../api/types';
interface HotelCardProps {
  hotel: RecentHotelResultDto;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '8px',
      }}>
      <Card
        sx={{
          margin: 2,
          borderRadius: 4,
          overflow: 'hidden',
        }}>
        {hotel.thumbnailUrl && (
          <CardMedia
            component="img"
            height="200"
            image={hotel.thumbnailUrl}
            alt={hotel.hotelName || 'Hotel Image'}
            sx={{
              objectFit: 'cover',
              transition: 'transform 0.3s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          />
        )}
        <CardContent sx={{ padding: 3, backgroundColor: 'transparent' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            {hotel.hotelName || 'Unnamed Hotel'}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', marginY: 1 }}>
            <Rating value={hotel.starRating ?? 0} readOnly />
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginLeft: 1, fontWeight: 500 }}>
              {hotel.starRating} Stars
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
            <LocationOnIcon sx={{ color: 'gray', marginRight: 1 }} />
            <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
              {hotel.cityName || 'City not available'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
            <EventIcon sx={{ color: 'gray', marginRight: 1 }} />
            <Typography color="primary.main" variant="body2" sx={{ fontWeight: 500 }}>
              Visited on: {new Date(hotel.visitDate || '').toLocaleDateString()}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
            <PriceCheckIcon color="action" sx={{ marginRight: 1 }} />
            <Typography
              color="primary.main"
              variant="body2"
              sx={{
                fontWeight: 600,
                letterSpacing: '0.5px',
              }}>
              Price: ${hotel.priceLowerBound ?? 0} - ${hotel.priceUpperBound ?? 0}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HotelCard;
