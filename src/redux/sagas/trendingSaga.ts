import { takeLatest, put, call } from 'redux-saga/effects';

import { getTrending, getTrendingSuccess, getTrendingFailure } from '../slices/homeSlice';
import { Destination, HotelDto } from '../../api/types';
import { createApiService } from '../../services/apiService';

function* handleFetchTrending() {
  const api = createApiService();
  try {
    const trends: { data: Destination[] } = yield call(api.api.homeDestinationsTrendingList);
    yield put(getTrendingSuccess(trends.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getTrendingFailure(error.message || 'An unknown error occurred'));
    } else {
      yield put(getTrendingFailure('An unknown error occurred'));
    }
  }
}

function* trendingSaga(): Generator {
  yield takeLatest(getTrending.type, handleFetchTrending);
}

export default trendingSaga;
