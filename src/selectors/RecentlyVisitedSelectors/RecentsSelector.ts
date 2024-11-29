import { createSelector } from 'reselect';

import { RootState } from '../../redux/store/store';
const selectRecentsData = (state: RootState) => state.recents;

export const selectRecents = createSelector([selectRecentsData], recents => ({ ...recents }));
