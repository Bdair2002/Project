import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  fetchHotelsRequest,
  fetchHotelsSuccess,
  fetchHotelsFailure,
  incrementPage,
} from '../slices/hotelsListSlice';
import { createApiService } from '../../services/apiService';
import { HotelWithoutRooms } from '../../api/types';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  selectHotelsPage,
  selectSearchQuery,
} from '../../selectors/hotelsListSelectors/hotelsListSelector';
function* fetchHotelsSaga(action: PayloadAction<void>) {
  const api = createApiService();
  try {
    const page: number = yield select(selectHotelsPage);
    const searchQuery: string = yield select(selectSearchQuery);

    const response: { data: HotelWithoutRooms[] } = yield call(api.api.hotelsList, {
      searchQuery,
      pageNumber: page,
    });

    yield put(fetchHotelsSuccess({ hotels: response.data, hasMore: response.data.length > 0 }));
    yield put(incrementPage());
  } catch (error: any) {
    yield put(fetchHotelsFailure(error.message));
  }
}

function* watchFetchHotels() {
  yield takeLatest(fetchHotelsRequest.type, fetchHotelsSaga);
}
export default watchFetchHotels;
