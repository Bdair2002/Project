import { createSelector } from 'reselect';
import { RootState } from '../../redux/store/store';
const selectTrendingData = (state: RootState) => state.trending;

export const selectMemoizedTrending = createSelector([selectTrendingData], trending => ({
  ...trending,
}));
