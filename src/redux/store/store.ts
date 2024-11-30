import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import authReducer from '../slices/authSlice';
import dataReducers from '../slices/homeSlice';
import searchResultsReducer from '../slices/searchResultsSlice';
import hotelReducer from '../slices/hotelSlice';
import cartReducer from '../slices/cartSlice';
import snackbarReducer from '../slices/snackbarSlice';
import { apiSlice } from '../slices/apiSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    featuredDeals: dataReducers.featuredDeals,
    recents: dataReducers.recentlyVisited,
    trending: dataReducers.trending,
    searchResults: searchResultsReducer,
    hotels: hotelReducer,
    cart: cartReducer,
    snackbar: snackbarReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(sagaMiddleware)
      .concat(apiSlice.middleware),
});

sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
export default store;
