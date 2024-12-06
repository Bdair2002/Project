import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectHotels,
  selectHotelsLoading,
  selectHotelsHasMore,
} from '../selectors/hotelsListSelectors/hotelsListSelector';
import { fetchHotelsRequest } from '../redux/slices/hotelsListSlice';
const useHotels = () => {
  const dispatch = useDispatch();

  const hotels = useSelector(selectHotels);
  const loading = useSelector(selectHotelsLoading);
  const hasMore = useSelector(selectHotelsHasMore);

  useEffect(() => {
    if (hotels.length === 0) {
      dispatch(fetchHotelsRequest());
    }
  }, [dispatch, hotels.length]);

  const fetchMoreHotels = () => {
    if (hasMore) {
      dispatch(fetchHotelsRequest());
    }
  };

  return { hotels, loading, hasMore, fetchMoreHotels };
};

export default useHotels;
