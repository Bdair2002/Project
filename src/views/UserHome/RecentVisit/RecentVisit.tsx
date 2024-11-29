import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useSelector, useDispatch } from 'react-redux';

import EmptyState from '../../../components/shared/EmptyState';
import ErrorMessage from '../../../components/shared/Error';
import Skeleton from '../../../components/shared/Skeleton';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { settings } from '../../../config/stepperSettings';
import { getRecentlyVisited } from '../../../redux/slices/homeSlice';
import SectionHeader from '../../../components/shared/SectionHeader';
import HotelCard from './components/HotelCard';
import { selectCurrentUser } from '../../../selectors/AuthSelectors/SelectUser';
import { selectRecents } from '../../../selectors/RecentlyVisitedSelectors/RecentsSelector';
const RecentlyVisited: React.FC = () => {
  const { data, status, error } = useSelector(selectRecents);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecentlyVisited({ user_id: user?.user_id }));
  }, [dispatch]);

  if (status === 'pending') {
    return (
      <Grid container>
        <Grid size={{ md: 6, xs: 12 }}>
          <Skeleton mediaHeight={150} contentLines={2} showActions={true} actionsHeight={50} />
        </Grid>
        <Grid size={{ md: 6, xs: 12 }}>
          <Skeleton mediaHeight={150} contentLines={2} showActions={true} actionsHeight={50} />
        </Grid>
      </Grid>
    );
  }

  if (error) {
    return <ErrorMessage message="An Error has Occurred 😢" />;
  }

  if (data.length === 0) {
    return <EmptyState message="You have not visited any hotels yet!" />;
  }

  return (
    <Box id="Recently-Visited" sx={{ marginBottom: '5rem' }}>
      <SectionHeader title="Recently Visited Hotels" />
      <Box sx={{ width: '97%' }}>
        <Slider {...settings}>
          {data.map(hotel => (
            <HotelCard key={hotel.hotelId} hotel={hotel} />
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default RecentlyVisited;
