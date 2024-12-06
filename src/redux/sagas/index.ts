import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import feautredDealsSaga from './featuredDealsSaga';
import RecentVistSaga from './recentsSaga';
import searchResutlsSaga from './searchResultsSaga';
import trendingSaga from './trendingSaga';
import hotelSaga from './hotelSaga';
import cartSaga from './cartSaga';
import hotelsListSaga from './hotelsListSaga';
function* rootSaga() {
  yield all([
    authSaga(),
    feautredDealsSaga(),
    RecentVistSaga(),
    searchResutlsSaga(),
    trendingSaga(),
    hotelSaga(),
    cartSaga(),
    hotelsListSaga(),
  ]);
}

export default rootSaga;
