import { takeLatest, put, call } from 'redux-saga/effects';

import {
  getFeaturedDeals,
  getFeaturedDealsFailure,
  getFeaturedDealsSuccess,
} from '../slices/homeSlice';
import { FeaturedDealDto } from '../../api/types';
import { createApiService } from '../../services/apiService';

function* handleFetchDeals() {
  const api = createApiService();
  try {
    const deals: { data: FeaturedDealDto[] } = yield call(api.api.homeFeaturedDealsList);
    yield put(getFeaturedDealsSuccess(deals.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getFeaturedDealsFailure(error.message || 'An unknown error occurred'));
    } else {
      yield put(getFeaturedDealsFailure('An unknown error occurred'));
    }
  }
}

function* feautredDealsSaga(): Generator {
  yield takeLatest(getFeaturedDeals.type, handleFetchDeals);
}

export default feautredDealsSaga;
