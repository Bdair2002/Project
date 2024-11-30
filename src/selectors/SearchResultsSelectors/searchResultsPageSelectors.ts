import { createSelector } from 'reselect';
import { RootState } from '../../redux/store/store';

const getSearchResultsState = (state: RootState) => state.searchResults;

export const selectSearchResults = createSelector([getSearchResultsState], searchResults => ({
  ...searchResults,
}));
