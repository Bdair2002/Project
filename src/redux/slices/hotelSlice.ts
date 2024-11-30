import { createSlice } from '@reduxjs/toolkit';
import { HotelDto, PhotoDto, RoomAvailabilityResultDto, ReviewDto } from '../../api/types';
interface HotelState {
  hotelDetails: HotelDto | null;
  gallery: PhotoDto[];
  availableRooms: RoomAvailabilityResultDto[];
  gallery_status: 'idle' | 'loading' | 'error';
  availableRooms_status: 'idle' | 'loading' | 'error';
  hotelDetails_status: 'idle' | 'loading' | 'error';
  reviews_status: 'idle' | 'loading' | 'error';
  error: string | null;
  reviews: ReviewDto[];
}

const initialState: HotelState = {
  hotelDetails: null,
  availableRooms: [],
  gallery: [],
  error: null,
  gallery_status: 'idle',
  availableRooms_status: 'idle',
  hotelDetails_status: 'idle',
  reviews_status: 'idle',
  reviews: [],
};

const hotelSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    fetchReviewsStart(state, action) {
      state.reviews = [];
      state.reviews_status = 'loading';
    },
    fetchReviewsSuccess(state, action) {
      state.reviews = action.payload;
      state.reviews_status = 'idle';
    },
    fetchReviewsFailure(state, action) {
      state.reviews_status = 'error';
      state.error = action.payload;
    },
    fetchAvailableRoomsStart(state, action) {
      state.availableRooms = action.payload;
      state.availableRooms_status = 'loading';
    },
    fetchAvailableRoomsSuccess(state, action) {
      state.availableRooms = action.payload;
      state.availableRooms_status = 'idle';
    },
    fetchAvailableRoomsFailure(state, action) {
      state.error = action.payload;
      state.availableRooms_status = 'error';
    },
    fetchHotelDetailsStart(state, action) {
      state.hotelDetails_status = 'loading';
      state.error = null;
    },
    fetchHotelDetailsSuccess(state, action) {
      state.hotelDetails = action.payload;
      state.hotelDetails_status = 'idle';
    },
    fetchHotelDetailsFailure(state, action) {
      state.hotelDetails_status = 'error';
      state.error = action.payload;
    },
    fetchGallerystart(state, action) {
      state.gallery_status = 'loading';
      state.error = null;
    },
    fetchGallerySuccess(state, action) {
      state.gallery = action.payload;
      state.gallery_status = 'idle';
    },
    fetchGalleryFailure(state, action) {
      state.gallery_status = 'error';
      state.error = action.payload;
    },
  },
});

export const {
  fetchHotelDetailsStart,
  fetchHotelDetailsSuccess,
  fetchHotelDetailsFailure,
  fetchGallerystart,
  fetchGallerySuccess,
  fetchGalleryFailure,
  fetchReviewsStart,
  fetchReviewsSuccess,
  fetchReviewsFailure,
  fetchAvailableRoomsStart,
  fetchAvailableRoomsSuccess,
  fetchAvailableRoomsFailure,

} = hotelSlice.actions;

export default hotelSlice.reducer;
