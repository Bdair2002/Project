import createDataSlice from '../../utils/sliceGenerator';
import { Destination } from '../../api/types';
import { RecentHotelResultDto } from '../../api/types';
import { FeaturedDealDto } from '../../api/types';

const trendingSlice = createDataSlice<Destination>('trending');
const recentlyVisitedSlice = createDataSlice<RecentHotelResultDto>('recentVisit');
const featuredDealsSlice = createDataSlice<FeaturedDealDto>('featuredDeals');

export const {
  getData: getTrending,
  getDataSuccess: getTrendingSuccess,
  getDataFailure: getTrendingFailure,
} = trendingSlice.actions;
export const {
  getData: getRecentlyVisited,
  getDataSuccess: getRecentlyVisitedSuccess,
  getDataFailure: getRecentlyVisitedFailure,
} = recentlyVisitedSlice.actions;
export const {
  getData: getFeaturedDeals,
  getDataSuccess: getFeaturedDealsSuccess,
  getDataFailure: getFeaturedDealsFailure,
} = featuredDealsSlice.actions;

export default {
  trending: trendingSlice.reducer,
  recentlyVisited: recentlyVisitedSlice.reducer,
  featuredDeals: featuredDealsSlice.reducer,
};
