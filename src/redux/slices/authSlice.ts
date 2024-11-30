import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../api/types';
import Cookies from 'js-cookie';

import { getDecodedUser, DecodedUser } from '../../utils/decodeToken';
interface AuthState {
  user: DecodedUser | null;
  status: 'idle' | 'pending' | 'success' | 'failure';
  error: string | null;
}
const initialState: AuthState = {
  user: getDecodedUser(),
  status: 'idle',
  error: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.status = 'pending';
      state.error = null;
    },
    loginUserSuccess: (state, action) => {
      const user: User = action.payload;
      state.status = 'success';
      Cookies.set('jwt', user.authentication);

      state.user = getDecodedUser();
    },
    loginUserFailure: (state, action) => {
      state.user = null;
      state.status = 'failure';
      state.error = action.payload;
      Cookies.remove('jwt');
    },
    logOut: state => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
      Cookies.remove('jwt');
    },
  },
});
export const { logOut, loginUser, loginUserFailure, loginUserSuccess } = authSlice.actions;
export default authSlice.reducer;
