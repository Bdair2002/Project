import { createSelector } from 'reselect';
import { RootState } from '../../redux/store/store';

const selectSnackbarData = (state: RootState) => state.snackbar;

export const selectSnackBar = createSelector([selectSnackbarData], snackbar => ({
  ...snackbar,
}));
