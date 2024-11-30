import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Draft } from 'immer';

function createDataSlice<T>(name: string) {
  const initialState = {
    data: [] as T[],
    status: 'idle',
    error: null as string | null,
  };

  return createSlice({
    name,
    initialState,
    reducers: {
      getData: (state, action: PayloadAction<{ user_id?: string } | undefined>) => {
        state.status = 'pending';
        state.error = null;
      },
      getDataSuccess: (state, action: PayloadAction<T[]>) => {
        state.data = action.payload as Draft<T>[];
        state.status = 'success';
      },
      getDataFailure: (state, action: PayloadAction<string>) => {
        state.data = [];
        state.status = 'failure';
        state.error = action.payload;
      },
    },
  });
}

export default createDataSlice;
