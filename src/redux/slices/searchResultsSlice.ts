import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResultDto, RoomAmenityDto } from '../../api/types';
import Cookies from 'js-cookie';

export interface FiltersState {
  priceRange: number[];
  starRating: number[];
  roomTypes: string[];
  amenities: string[];
}

export interface SearchResultsState {
  sortOption: string;
  filters: FiltersState;
  searchResults: SearchResultDto[];
  status: 'idle' | 'loading' | 'error';
  error: string | null;
  amenities: RoomAmenityDto[] | null;
  favorites: number[];
}

const initialState: SearchResultsState = {
  filters: {
    priceRange: [50, 300],
    starRating: [],
    roomTypes: [],
    amenities: [],
  },
  sortOption: 'Relevance',
  searchResults: [],
  status: 'idle',
  error: null,
  amenities: [],
  favorites: JSON.parse(Cookies.get('favorites') || '[]'),
};

const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<FiltersState>) {
      state.filters = action.payload;
    },
    setSortOption(state, action: PayloadAction<string>) {
      state.sortOption = action.payload;
    },
    fetchSearchResultsStart(state, action) {
      state.status = 'loading';
      state.searchResults = [];
      state.error = null;
    },
    fetchSearchResultsSuccess(state, action: PayloadAction<SearchResultDto[]>) {
      state.status = 'idle';
      state.searchResults = action.payload;
    },
    fetchSearchResultsFailure(state, action: PayloadAction<string>) {
      state.status = 'error';
      state.error = action.payload;
    },
    fetchSearchAmenitiesSuccess(state, action: PayloadAction<RoomAmenityDto[]>) {
      state.amenities = action.payload;
    },
    fetchSearchAmenitiesStart(state) {
      state.amenities = [];
    },
    fetchSearchAmenitiesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<number>) {
      const hotelId = action.payload;
      if (state.favorites.includes(hotelId)) {
        state.favorites = state.favorites.filter(id => id !== hotelId);
        Cookies.set('favorites', JSON.stringify(state.favorites));
      } else {
        state.favorites.push(hotelId);
        Cookies.set('favorites', JSON.stringify(state.favorites));
      }
    },
  },
});

export const {
  setFilters,
  setSortOption,
  fetchSearchAmenitiesSuccess,
  fetchSearchAmenitiesStart,
  fetchSearchResultsStart,
  fetchSearchResultsSuccess,
  fetchSearchResultsFailure,
  toggleFavorite,
  fetchSearchAmenitiesFailure,
} = searchResultsSlice.actions;

export default searchResultsSlice.reducer;
