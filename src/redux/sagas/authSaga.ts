import { takeLatest, put, call, take } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { loginUser, loginUserSuccess, loginUserFailure } from '../slices/authSlice';
import { createApiService } from '../../services/apiService';
import { AuthenticationRequestBody } from '../../api/types';
import { User } from '../../api/types';
const api = createApiService();

interface LoginPayload {
  username: string;
  password: string;
}

function* handleLogin(action: PayloadAction<LoginPayload>) {
  try {
    const { username, password } = action.payload;

    const response: { data: User } = yield call(api.api.authAuthenticateCreate, {
      userName: username,
      password,
    } as AuthenticationRequestBody);
    const user: User = response.data;
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
