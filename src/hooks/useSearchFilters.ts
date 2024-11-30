import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store/store';
import {
  setFilters,
  setSortOption,
  FiltersState,
  fetchSearchResultsStart,
  fetchSearchAmenitiesStart,
  toggleFavorite,
} from '../redux/slices/searchResultsSlice';
import { QueryParamsType } from '../api/types';
import { useMemo, useCallback } from 'react';
import { selectSearchResults } from '../selectors/SearchResultsSelectors/searchResultsPageSelectors';

const useSearchBar = () => {
  const dispatch = useDispatch();
  const searchState = useSelector(selectSearchResults);
  const searchHotels = useCallback(
    (queryParams: QueryParamsType) => {
      dispatch(fetchSearchResultsStart(queryParams));
    },
    [dispatch],
  );

  const getAmenities = useCallback(() => {
    dispatch(fetchSearchAmenitiesStart());
  }, [dispatch]);

  const applyFilters = useCallback(
    (filters: FiltersState) => {
      dispatch(setFilters(filters));
    },
    [dispatch],
  );

  const applySortOption = useCallback(
    (sortOption: string) => {
      dispatch(setSortOption(sortOption));
    },
    [dispatch],
  );

  const handleFavoriteToggle = useCallback(
    (hotelId: number) => {
      dispatch(toggleFavorite(hotelId));
    },
    [dispatch],
  );

  return useMemo(
    () => ({
      ...searchState,
      applyFilters,
      searchHotels,
      applySortOption,
      getAmenities,
      handleFavoriteToggle,
    }),
    [searchState, applyFilters, searchHotels, applySortOption, getAmenities, handleFavoriteToggle],
  );
};

export default useSearchBar;
