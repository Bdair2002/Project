import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HotelWithoutRooms } from '../../api/types';

interface HotelState {
  hotels: HotelWithoutRooms[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  searchQuery: string;
}

const initialState: HotelState = {
  hotels: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  searchQuery: '',
};
const hotelSlice = createSlice({
  name: 'hotelsList',
  initialState,
  reducers: {
    fetchHotelsRequest(state) {
      state.loading = true;
    },
    fetchHotelsSuccess(
      state,
      action: PayloadAction<{ hotels: HotelWithoutRooms[]; hasMore: boolean }>,
    ) {
      state.hotels = [...state.hotels, ...action.payload.hotels];
      state.hasMore = action.payload.hasMore;
      state.loading = false;
    },
    fetchHotelsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    incrementPage(state) {
      state.page += 1;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.page = 1;
      state.hotels = [];
      state.hasMore = true;
    },
    resetState(state) {
      state.hotels = [];
      state.page = 1;
      state.hasMore = true;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  fetchHotelsRequest,
  fetchHotelsSuccess,
  fetchHotelsFailure,
  incrementPage,
  setSearchQuery,
  resetState,
} = hotelSlice.actions;
export default hotelSlice.reducer;
