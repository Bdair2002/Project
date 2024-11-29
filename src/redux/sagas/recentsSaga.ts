import { takeLatest, put, call } from 'redux-saga/effects';
import {
  getRecentlyVisited,
  getRecentlyVisitedFailure,
  getRecentlyVisitedSuccess,
} from '../slices/homeSlice';
import { RecentHotelResultDto } from '../../api/types';
import { createApiService } from '../../services/apiService';
import { PayloadAction } from '@reduxjs/toolkit';
interface RecentVisitPayload {
  user_id: number;
}
function* handleFetchRecents(action: PayloadAction<RecentVisitPayload>) {
  const api = createApiService();
  try {
    const recents: { data: RecentHotelResultDto[] } = yield call(
      api.api.homeUsersRecentHotelsDetail,
      action.payload.user_id,
    );
    yield put(getRecentlyVisitedSuccess(recents.data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(getRecentlyVisitedFailure(error.message || 'An unknown error occurred'));
    } else {
      yield put(getRecentlyVisitedFailure('An unknown error occurred'));
    }
  }
}

function* RecentVisitSaga(): Generator {
  yield takeLatest(getRecentlyVisited.type, handleFetchRecents);
}

export default RecentVisitSaga;
