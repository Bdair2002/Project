import React, { memo } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import HotelCard from './SearchResultCard';
import SortByComponent from './SortBy';
import { useSelector } from 'react-redux';
import { selectFilteredAndSortedSearchResults } from '../../../selectors/SearchResultsSelectors/searchResultsSelectors';
import { NotFound } from '../..';
import ErrorMessage from '../../../components/shared/Error';
import Skeleton from '../../../components/shared/Skeleton';
import useSearchFilters from '../../../hooks/useSearchFilters';
import { Link, useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const navigate = useNavigate();
  const searchResults = useSearchFilters();
  const filteredResults = useSelector(selectFilteredAndSortedSearchResults);

  const handleFavoriteToggle = (hotelId: number) => {
    searchResults.handleFavoriteToggle(hotelId);
  };

  const handleHotelClick = (hotelId: number) => {
    navigate(`/hotel/${hotelId}`);
  };

  return (
    <Box>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        Search Results
      </Typography>

      {!searchResults.searchResults && searchResults.status !== 'loading' && (
        <Typography color="textSecondary" variant="subtitle1">
          Please enter your search criteria above to find the best hotel for your stay.
        </Typography>
      )}

      {searchResults.status === 'loading' && (
        <Grid container spacing={3}>
          {[...Array(6)].map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 12, md: 6 }}>
              <Skeleton />
            </Grid>
          ))}
        </Grid>
      )}

      {searchResults.error && <ErrorMessage message="Failed to fetch results" />}

      {searchResults.status !== 'loading' &&
        !searchResults.error &&
        searchResults.searchResults?.length === 0 && (
          <Typography>No results found. Please try a different search.</Typography>
        )}

      {searchResults.status === 'idle' &&
        searchResults.searchResults?.length > 0 &&
        !searchResults.error && (
          <>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography variant="subtitle1" gutterBottom color="textSecondary">
                We found {filteredResults.length} results for your search.
              </Typography>
              <SortByComponent onSortChange={searchResults.applySortOption} />
            </Box>

            <Grid container spacing={3}>
              {filteredResults.map(result => (
                <Grid key={result.hotelId} size={{ xs: 12, sm: 12, md: 6 }}>
                  <HotelCard
                    hotel={result}
                    isFavorite={searchResults.favorites.includes(result.hotelId!)}
                    onFavoriteToggle={handleFavoriteToggle}
                    onClick={handleHotelClick}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
    </Box>
  );
};

export default memo(SearchResults);
