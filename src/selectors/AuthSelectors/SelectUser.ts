import { createSelector } from 'reselect';
import { RootState } from '../../redux/store/store';

const selectAuthState = (state: RootState) => state.auth;

export const selectAuth = createSelector([selectAuthState], auth => ({
  ...auth,
}));

export const selectCurrentUser = createSelector([selectAuth], auth => auth.user);
