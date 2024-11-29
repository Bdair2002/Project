import HotelIcon from '@mui/icons-material/Hotel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { FeaturedDealDto } from '../../../../api/types';
import { limitString } from '../../../../utils/limitString';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

interface HotelCardProps {
  deal: FeaturedDealDto;
}

const HotelCard = ({ deal }: HotelCardProps) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '80vh',
        borderRadius: '8px',
        padding: '16px',
      }}>
      <Card
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}>
        <CardMedia
          component="img"
          alt={`${deal.hotelName} image`}
          image={deal.roomPhotoUrl ? deal.roomPhotoUrl : ''}
          sx={{ height: 200, objectFit: 'cover' }}
        />

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography
            gutterBottom
            variant="h5"
            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {deal.title}
          </Typography>

          {deal.description && (
            <Typography sx={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {limitString(deal.description, 100)}
            </Typography>
          )}

          <Stack direction="column" gap={1} pt={1} sx={{ flexGrow: 1 }}>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" alignItems="center" gap={1}>
                <LocationOnIcon />
                <Typography variant="body1">{deal.cityName}</Typography>
              </Stack>
              <Rating name="rating" value={deal.hotelStarRating} readOnly />
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" alignItems="center" gap={1}>
                <HotelIcon />
                <Typography variant="body1">{deal.hotelName}</Typography>
              </Stack>

              <Stack direction="row" alignItems="center">
                <>
                  <Typography
                    variant="overline"
                    color="error.main"
                    sx={{ textDecoration: 'line-through' }}>
                    ${deal.originalRoomPrice}
                  </Typography>
                  <Typography variant="subtitle1" color="success.main">
                    &nbsp; ${deal.finalPrice}
                  </Typography>
                </>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>

        <CardActions sx={{ justifyContent: 'center', mt: 'auto', pb: 3 }}>
          <Button
            onClick={() => {
              navigate(`/hotel/${deal.hotelId}`);
            }}
            variant="contained">
            Show more details
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default HotelCard;
