import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import { useEffect } from 'react';
import { getFeaturedDeals } from '../../../redux/slices/homeSlice';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FeaturedCards from './components/featuredCards';

import '../../../styles/slider.css';
import Skeleton from '../../../components/shared/Skeleton';
import Grid from '@mui/material/Grid2';
import Error from '../../../components/shared/Error';
import EmptyState from '../../../components/shared/EmptyState';
import Box from '@mui/material/Box';

import { settings } from '../../../config/stepperSettings';
import { selectFeaturedDeals } from '../../../selectors/FeaturedDealsSelector/DealsSelector';
import SectionHeader from '../../../components/shared/SectionHeader';
const FeaturedDeals = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector(selectFeaturedDeals);
  useEffect(() => {
    dispatch(getFeaturedDeals());
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
    return <Error message="Failed to fetch" />;
  }

  if (!data.length) {
    return <EmptyState message="No Featured Deals!" />;
  }

  return (
    <Box id="Featured-Deals" sx={{ marginBottom: '5rem' }}>
      <SectionHeader title="Featured Deals" />
      <Box sx={{ width: '97%' }}>
        <Slider {...settings}>
          {data?.map(deal => <FeaturedCards deal={deal} key={deal.hotelId} />)}
        </Slider>
      </Box>
    </Box>
  );
};

export default FeaturedDeals;
