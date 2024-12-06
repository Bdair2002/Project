import { createSelector } from 'reselect';
import { RootState } from '../../redux/store/store';

const selectHotelsState = (state: RootState) => state.hotelsList;

export const selectHotelsPage = createSelector(
  [selectHotelsState],
  hotelsState => hotelsState.page,
);

export const selectHotels = createSelector([selectHotelsState], hotelsState => hotelsState.hotels);

export const selectHotelsLoading = createSelector(
  [selectHotelsState],
  hotelsState => hotelsState.loading,
);

export const selectHotelsHasMore = createSelector(
  [selectHotelsState],
  hotelsState => hotelsState.hasMore,
);

export const selectSearchQuery = createSelector(
  [selectHotelsState],
  hotelsState => hotelsState.searchQuery,
);

export const selectError = createSelector([selectHotelsState], hotelsState => hotelsState.error);
