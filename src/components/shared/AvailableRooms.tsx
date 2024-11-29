import { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Box,
  Divider,
  Tooltip,
  Chip,
} from '@mui/material';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import GroupIcon from '@mui/icons-material/Group';
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import { HotelChildProps } from '../../views/HotelPage/HotelPage';
import BookingModal from '../../views/HotelPage/components/BookingModal';
import { RoomAvailabilityResultDto } from '../../api/types';
import useCart from '../../hooks/useCart';

const AvailableRooms = ({ rooms, page = 'hotelPage' }: HotelChildProps) => {
  const [openModalRoom, setOpenModalRoom] = useState<RoomAvailabilityResultDto | null>(null);
  const cart = useCart();
  return (
    <Grid container spacing={2}>
      {rooms.map(room => (
        <Grid size={{ xs: 12, sm: 6 }} key={room.roomId}>
          <Card sx={{ position: 'relative', height: '100%' }}>
            <CardMedia component="img" height="200" image={room.roomPhotoUrl || ''} alt={'Room'} />
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Tooltip title="Room type">
                  <Typography variant="h6">{room.roomType}</Typography>
                </Tooltip>
                <Tooltip title="Room number">
                  <Typography color="textSecondary">{`Room ${room.roomNumber}`}</Typography>
                </Tooltip>
              </Box>
              <Typography variant="body1" fontWeight={'bold'} color="primary">
                <Tooltip title="Price per night">
                  <Box component="span" sx={{ marginRight: 1 }}>
                    ${room.price} / night
                  </Box>
                </Tooltip>
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                <Tooltip title="Capacity children">
                  <ChildCareIcon sx={{ marginRight: 1 }} />
                </Tooltip>
                <Typography variant="body1">{room.capacityOfAdults} </Typography>
                <Tooltip title="Capacity adults">
                  <GroupIcon sx={{ marginRight: 1, marginLeft: 3 }} />
                </Tooltip>
                <Typography variant="body1">{room.capacityOfChildren} </Typography>
              </Box>
              <Divider sx={{ marginY: 1 }} />
              <Box>
                {room.roomAmenities?.map((amenity, index) => (
                  <Tooltip key={index} title={amenity.description}>
                    <Chip
                      label={amenity.name}
                      variant="outlined"
                      color="primary"
                      sx={{ marginRight: 1, marginBottom: 1 }}
                    />
                  </Tooltip>
                ))}
              </Box>
            </CardContent>
            <CardActions>
              {page === 'hotelPage' &&
                (cart.bookings.filter(booking => booking.roomId === room.roomId).length === 1 ? (
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    onClick={() => cart.removeFromCart(room)}>
                    Remove from cart
                  </Button>
                ) : (
                  <>
                    <Button fullWidth variant="contained" onClick={() => setOpenModalRoom(room)}>
                      Add to cart
                    </Button>
                    {openModalRoom && openModalRoom.roomId === room.roomId && (
                      <BookingModal
                        open={!!openModalRoom}
                        onClose={() => setOpenModalRoom(null)}
                        room={openModalRoom}
                      />
                    )}
                  </>
                ))}
              {page === 'cartPage' && (
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={() => cart.removeFromCart(room)}>
                  Remove <CloseIcon />
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AvailableRooms;
