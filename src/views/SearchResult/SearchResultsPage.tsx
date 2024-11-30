import React from 'react';
import { Box, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Filters from './components/Filters';
import SearchResults from './components/SearchResults';
import SearchBox from '../UserHome/SearchBar';
import { useScrollTop, useDocumentTitle } from '../../hooks';
const SearchResultsPage = () => {
  useScrollTop();
  useDocumentTitle('Traveller - Search');
  return (
    <Container sx={{ width: '100%' }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <SearchBox />
        </Grid>
        <Grid
          sx={{
            width: '100%',
          }}
          container>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'sticky',
                top: 60,
              }}>
              <Filters />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              sx={{
                width: '100%',
              }}>
              <SearchResults />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchResultsPage;
