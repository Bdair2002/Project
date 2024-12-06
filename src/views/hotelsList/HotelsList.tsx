import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, TextField, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import HotelCard from './components/HotelCard';
import useHotels from '../../hooks/useHotelsList';
import { useDispatch } from 'react-redux';
import { setSearchQuery, resetState, fetchHotelsRequest } from '../../redux/slices/hotelsListSlice';
import useDebounce from '../../hooks/useDebounce';

const HotelsList: React.FC = () => {
  const { hotels, loading, hasMore, fetchMoreHotels } = useHotels();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(setSearchQuery(debouncedSearchTerm));
    if (debouncedSearchTerm || debouncedSearchTerm === '') {
      dispatch(fetchHotelsRequest());
    }
  }, [dispatch, debouncedSearchTerm]);

  return (
    <Box sx={{ padding: 3 }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 2 }}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <Typography variant="h4" gutterBottom>
        Hotels List
      </Typography>

      <InfiniteScroll
        style={{ overflow: 'hidden' }}
        dataLength={hotels.length}
        next={fetchMoreHotels}
        hasMore={hasMore}
        loader={
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <CircularProgress />
          </Box>
        }
        endMessage={
          <Typography variant="body1" align="center" sx={{ marginTop: 2 }}>
            No more hotels to load.
          </Typography>
        }>
        <Box sx={{ display: 'grid', gap: 3 }}>
          {hotels.map(hotel => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </Box>
      </InfiniteScroll>
    </Box>
  );
};

export default HotelsList;
