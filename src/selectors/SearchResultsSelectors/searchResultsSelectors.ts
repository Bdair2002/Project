import { createSelector } from 'reselect';
import { RootState } from '../../redux/store/store';

const selectSearchResults = (state: RootState) => state.searchResults.searchResults;
const selectFilters = (state: RootState) => state.searchResults.filters;
const selectSortOption = (state: RootState) => state.searchResults.sortOption;
const selectFavorites = (state: RootState) => state.searchResults.favorites;

const selectFilteredSearchResults = createSelector(
  [selectSearchResults, selectFilters],
  (searchResults, filters) => {
    return searchResults.filter(result => {
      const matchesPrice =
        !filters.priceRange.length ||
        (result.roomPrice &&
          result.roomPrice >= filters.priceRange[0] &&
          result.roomPrice <= filters.priceRange[1]);

      const matchesStarRating =
        !filters.starRating.length ||
        (result.starRating && filters.starRating.includes(result.starRating));

      const matchesRoomType =
        !filters.roomTypes.length ||
        (result.roomType && filters.roomTypes.includes(result.roomType));

      const matchesAmenities =
        !filters.amenities.length ||
        filters.amenities.every(amenity =>
          result.amenities?.some(a => a.name === (amenity === 'Free Wi-Fi' ? 'wifi' : amenity)),
        );

      return matchesPrice && matchesStarRating && matchesRoomType && matchesAmenities;
    });
  },
);

// Sorting Selector
const selectSortedSearchResults = createSelector(
  [selectFilteredSearchResults, selectSortOption, selectFavorites],
  (filteredResults, sortOption, favorites) => {
    const sortedResults = [...filteredResults];

    switch (sortOption) {
      case 'Price Low to High':
        sortedResults.sort((a, b) => (a.roomPrice ?? 0) - (b.roomPrice ?? 0));
        break;
      case 'Price High to Low':
        sortedResults.sort((a, b) => (b.roomPrice ?? 0) - (a.roomPrice ?? 0));
        break;
      case 'Rating':
        sortedResults.sort((a, b) => (b.starRating ?? 0) - (a.starRating ?? 0));
        break;
      case 'Favorites':
        return sortedResults.filter(result => favorites.includes(result.hotelId!));
      default:
        break;
    }

    return sortedResults;
  },
);

export const selectFilteredAndSortedSearchResults = selectSortedSearchResults;
