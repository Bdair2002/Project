import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchSearchResultsStart,
  fetchSearchResultsSuccess,
  fetchSearchAmenitiesSuccess,
  fetchSearchAmenitiesFailure,
  fetchSearchAmenitiesStart,
  fetchSearchResultsFailure,
} from '../slices/searchResultsSlice';
import { SearchResultDto } from '../../api/types';
import { PayloadAction } from '@reduxjs/toolkit';
import { createApiService } from '../../services/apiService';

import { QueryParamsType, RoomAmenityDto } from '../../api/types';
interface FetchPayload {
  queryParams: QueryParamsType;
}

function* fetchSearchResultsSaga(action: PayloadAction<QueryParamsType>) {
  const api = createApiService();
  try {
    const queryParams = action.payload;

    const results: { data: SearchResultDto[] } = yield call(api.api.homeSearchList, {
      city: queryParams.cityName,
      checkInDate: queryParams.checkIn,
      checkOutDate: queryParams.checkOut,
      adults: queryParams.adults,
      children: queryParams.children,
      numberOfRooms: queryParams.numberOfRooms,
    });
    yield put(fetchSearchResultsSuccess(results.data));
  } catch (error) {
    yield put(fetchSearchResultsFailure('Failed to fetch search results.'));
  }
}

function* fetchSearchAmenitiesSaga() {
  const api = createApiService();
  try {
    const results: { data: RoomAmenityDto[] } = yield call(api.api.searchResultsAmenitiesList);
    yield put(fetchSearchAmenitiesSuccess(results.data));
  } catch (error) {
    yield put(fetchSearchAmenitiesFailure('Failed to fetch  amenities.'));
  }
}

export function* searchResultsSaga() {
  yield takeLatest(fetchSearchResultsStart.type, fetchSearchResultsSaga);
  yield takeLatest(fetchSearchAmenitiesStart.type, fetchSearchAmenitiesSaga);
}

export default searchResultsSaga;
