import { takeLatest, call, put } from 'redux-saga/effects';
import { PhotoDto, RoomAvailabilityResultDto, ReviewDto } from '../../api/types';
import {
  fetchHotelDetailsStart,
  fetchHotelDetailsSuccess,
  fetchHotelDetailsFailure,
  fetchGallerystart,
  fetchAvailableRoomsFailure,
  fetchReviewsFailure,
  fetchReviewsSuccess,
  fetchAvailableRoomsStart,
  fetchAvailableRoomsSuccess,
  fetchGallerySuccess,
  fetchGalleryFailure,
  fetchReviewsStart,

} from '../slices/hotelSlice';
import { HotelDto } from '../../api/types';
import { PayloadAction } from '@reduxjs/toolkit';
import { createApiService } from '../../services/apiService';

function* fetchHotelDetailsSaga(action: PayloadAction<number>) {
  const api = createApiService();
  try {
    const response: { data: HotelDto[] } = yield call(api.api.getHotel, action.payload);
    yield put(fetchHotelDetailsSuccess(response.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchHotelDetailsFailure(error.message));
    }
  }
}

function* fetchGallerySaga(action: PayloadAction<number>) {
  const api = createApiService();
  try {
    const response: { data: PhotoDto[] } = yield call(api.api.hotelsGalleryDetail, action.payload);
    yield put(fetchGallerySuccess(response.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchGalleryFailure(error.message));
    }
  }
}

function* fetchAvailableRoomsSaga(action: PayloadAction<any>) {
  const api = createApiService();

  try {
    const response: { data: RoomAvailabilityResultDto[] } = yield call(
      api.api.hotelsAvailableRoomsDetail,
      action.payload.hotelId,
      {
        checkInDate: action.payload.checkIn,
        CheckOutDate: action.payload.checkOut,
      },
    );
    yield put(fetchAvailableRoomsSuccess(response.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchAvailableRoomsFailure(error.message));
    }
  }
}
function* fetchReviewsSaga(action: PayloadAction<number>) {
  const api = createApiService();
  try {
    const response: { data: ReviewDto[] } = yield call(api.api.hotelsReviewsDetail, action.payload);
    yield put(fetchReviewsSuccess(response.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchReviewsFailure(error.message));
    }
  }
}



export default function* hotelSaga() {
  yield takeLatest(fetchHotelDetailsStart.type, fetchHotelDetailsSaga);
  yield takeLatest(fetchGallerystart.type, fetchGallerySaga);
  yield takeLatest(fetchAvailableRoomsStart.type, fetchAvailableRoomsSaga);
  yield takeLatest(fetchReviewsStart.type, fetchReviewsSaga);

}
