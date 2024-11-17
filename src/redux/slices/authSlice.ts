import { createSlice, isPending } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
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
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.status = 'success';
      localStorage.setItem('token', token);
    },
    loginUserFailure: (state, action) => {
      state.user = null;
      state.token = null;
      state.status = 'failure';
      state.error = action.payload;
      localStorage.removeItem('token');
    },
    logOut: state => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('token');
    },
  },
});
export const { logOut, loginUser, loginUserFailure, loginUserSuccess } = authSlice.actions;
export default authSlice.reducer;
