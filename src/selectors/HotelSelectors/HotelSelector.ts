import { createSelector } from 'reselect';

import { RootState } from '../../redux/store/store';
const selectHotelsData = (state: RootState) => state.hotels;

export const selectHotels = createSelector([selectHotelsData], hotels => ({ ...hotels }));
