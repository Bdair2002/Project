import { takeLatest, call, put } from 'redux-saga/effects';
import {
  checkoutRequest,
  checkoutSuccess,
  checkoutFailure,
  fetchBookingInfoRequest,
  fetchBookingInfoSuccess,
  fetchBookingInfoFailure,
} from '../slices/cartSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { createApiService } from '../../services/apiService';
import { BookingRequest, BookingDetailsDto } from '../../api/types';
function* postCheckout(action: PayloadAction<BookingRequest>) {
  const api = createApiService();
  try {
    yield call(api.api.bookingsCreate, action.payload);
    yield put(fetchBookingInfoRequest(0));
  } catch (error) {
    if (error instanceof Error) {
      yield put(checkoutFailure());
    }
  }
}

function* fetchBookingInfoDetails(action: PayloadAction<number>) {
  const api = createApiService();
  try {
    const response: { data: BookingDetailsDto } = yield call(api.api.getBooking, action.payload);
    yield put(fetchBookingInfoSuccess(response.data));
    yield put(checkoutSuccess());
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchBookingInfoFailure());
    }
  }
}
export default function* cartSaga() {
  yield takeLatest(checkoutRequest, postCheckout);
  yield takeLatest(fetchBookingInfoRequest, fetchBookingInfoDetails);
}
