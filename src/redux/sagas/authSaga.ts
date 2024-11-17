import { takeLatest, put, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { loginUser, loginUserSuccess, loginUserFailure } from '../slices/authSlice';
import { authenticateUser } from '../../services/authService/authenticate';

interface LoginPayload {
  username: string;
  password: string;
}

interface User {
  id: string;
  username: string;
  token: string;
}

function* handleLogin(action: PayloadAction<LoginPayload>) {
  try {
    const { username, password } = action.payload;

    const user: User = yield call(authenticateUser, username, password);

    yield put(loginUserSuccess(user));
  } catch (error) {
    if (error instanceof Error) {
      yield put(loginUserFailure(error.message || 'An unknown error occurred'));
    } else {
      yield put(loginUserFailure('An unknown error occurred'));
    }
  }
}

function* authSaga(): Generator {
  yield takeLatest(loginUser.type, handleLogin);
}

export default authSaga;
