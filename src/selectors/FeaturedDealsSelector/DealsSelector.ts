import { createSelector } from 'reselect';
import { RootState } from '../../redux/store/store';
const selectFeaturedDealsData = (state: RootState) => state.featuredDeals;

export const selectFeaturedDeals = createSelector([selectFeaturedDealsData], featuredDeals => ({
  ...featuredDeals,
}));
