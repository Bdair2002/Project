import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SnackbarOrigin } from '@mui/material/Snackbar';
import { ReactNode } from 'react';
import { AlertColor, AlertProps } from '@mui/material';

export type options = Omit<SnackbarState, 'isOpen' | 'severity'> & { severity?: AlertColor };
export interface SnackbarState {
  message?: ReactNode;
  isOpen: boolean;
  title?: ReactNode;
  severity?: AlertColor;
  variant?: AlertProps['variant'];
  anchorOrigin: SnackbarOrigin;
  autoHideDuration?: number | null;
  icon?: ReactNode;
  action?: ReactNode;
}

const initialState: SnackbarState = {
  isOpen: false,
  severity: 'info',
  variant: 'standard',
  title: null,
  message: '',
  anchorOrigin: { vertical: 'top', horizontal: 'center' },
  autoHideDuration: null,
  icon: undefined,
  action: null,
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, { payload }: PayloadAction<options>) => {
      Object.assign(state, {
        isOpen: true,
        severity: payload.severity ?? 'info',
        action: payload.action ?? null,
        ...payload,
      });
    },
    hideSnackbar: state => {
      state.isOpen = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
