import { useEffect, useState } from 'react';
import { Box, Rating, Typography, Divider, Button, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Gallery from './components/Gallery';
import AvailableRooms from '../../components/shared/AvailableRooms';
import Map from './components/Map';
import { useParams } from 'react-router-dom';
import useHotel from '../../hooks/useHotel';
import { LocationOn } from '@mui/icons-material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ReviewsModal from './components/Reviews';
import { RoomAvailabilityResultDto } from '../../api/types';
import Skeleton from '../../components/shared/Skeleton';
import { useScrollTop, useDocumentTitle } from '../../hooks';
export type HotelChildProps = {
  rooms: RoomAvailabilityResultDto[];
  page: string;
};
const HotelPage = () => {
  useScrollTop();
  useDocumentTitle('Traveller');
  const { hotelId } = useParams<{ hotelId: string }>();
  const [isReviewsModalOpen, setReviewsModalOpen] = useState(false);

  const hotel = useHotel(Number(hotelId));

  useEffect(() => {
    hotel.loadData();
  }, []);

  return (
    <Box sx={{ padding: 4, maxWidth: 1200, margin: 'auto' }}>
      <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
        {hotel.hotelDetails?.hotelName}
      </Typography>

      <Box sx={{ marginBottom: 3 }}>
        <Gallery hotelId={Number(hotelId)} />
      </Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography color="textSecondary" variant="subtitle1">
            <LocationOn />
            {hotel.hotelDetails?.location}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3, whiteSpace: 'pre-line' }}>
            {hotel.hotelDetails?.description}
          </Typography>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          size={{ xs: 12, md: 6 }}>
          {hotel.hotelDetails?.amenities &&
            hotel.hotelDetails?.amenities.map((amenity, index) => {
              return (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '1.2rem',
                    flexWrap: 'wrap',
                  }}>
                  <TaskAltIcon color="primary" fontSize="medium" sx={{ marginRight: 1 }} />
                  {amenity.name}
                </Typography>
              );
            })}
        </Grid>
      </Grid>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <Rating value={hotel.hotelDetails?.starRating ?? 0} readOnly />

        <Typography
          sx={{
            marginLeft: 3,
          }}
          variant="body2"
          color="textPrimary">
          <Button variant="text" onClick={() => setReviewsModalOpen(true)}>
            {hotel.reviews?.length} Reviews
          </Button>

          <ReviewsModal
            open={isReviewsModalOpen}
            onClose={() => {
              setReviewsModalOpen(false);
            }}
            reviews={hotel.reviews || []}
          />
        </Typography>
      </Box>

      <Divider sx={{ marginBottom: 2 }} />

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Available Rooms
          </Typography>
          {hotel.availableRooms_status === 'loading' ? (
            <Grid container spacing={2}>
              {[...Array(4)].map((_, index) => (
                <Grid key={index} size={{ xs: 12, md: 6 }}>
                  <Skeleton
                    contentLines={3}
                    actionsHeight={2}
                    showActions={true}
                    mediaHeight={100}
                  />
                </Grid>
              ))}
            </Grid>
          ) : hotel.availableRooms.length === 0 ? (
            <Typography variant="h6" color="textSecondary">
              No rooms available
            </Typography>
          ) : (
            <AvailableRooms page="hotelPage" rooms={hotel.availableRooms} />
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Map
            latitude={hotel.hotelDetails?.latitude ?? 0}
            longitude={hotel.hotelDetails?.longitude ?? 0}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HotelPage;
