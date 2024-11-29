import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Skeleton from '../../../components/shared/Skeleton';
import Grid from '@mui/material/Grid2';
import ErrorMessage from '../../../components/shared/Error';
import EmptyState from '../../../components/shared/EmptyState';
import { getTrending } from '../../../redux/slices/homeSlice';
import { selectMemoizedTrending } from '../../../selectors/TrendingSelectors/trendingSelector';
import SectionHeader from '../../../components/shared/SectionHeader';
const TrendingDestinations: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTrending());
  }, [dispatch]);
  const { data, error, status } = useSelector(selectMemoizedTrending);
  if (status === 'pending')
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
  if (error) return <ErrorMessage message={'An error has occured'} />;
  if (data.length === 0) return <EmptyState message="Nothing is trending" />;

  return (
    <Box id="Trending-Destinations" sx={{ padding: 4, position: 'relative' }}>
      <SectionHeader title="Trending Destinations" />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 4,
          position: 'relative',
        }}>
        {data.map((destination, index) => (
          <Box
            key={destination.cityId}
            sx={{
              position: 'relative',
              width: index % 2 === 0 ? '280px' : '360px',
              height: index % 2 === 0 ? '380px' : '450px',
              transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})`,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'rotate(0deg)',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
              },
              borderRadius: '12px',
              overflow: 'hidden',
            }}>
            <Box
              component="img"
              src={destination.thumbnailUrl || 'https://via.placeholder.com/400'}
              alt={destination.cityName || 'Destination'}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 1,
                opacity: 0.8,
              }}
            />
            <Box
              sx={{
                width: '100%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
                textAlign: 'center',
                padding: 2,
                background: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '10px',
              }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: 'white',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                }}>
                {destination.cityName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  fontStyle: 'italic',
                  marginTop: 1,
                }}>
                {destination.countryName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'white',
                  marginTop: 1,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}>
                {destination.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TrendingDestinations;
