import { useDispatch, useSelector } from 'react-redux';
import {
  fetchHotelDetailsStart,
  fetchGallerystart,
  fetchAvailableRoomsStart,
  fetchReviewsStart,
} from '../redux/slices/hotelSlice';
import dayjs from 'dayjs';
import { selectHotels } from '../selectors/HotelSelectors/HotelSelector';

const useHotel = (hotelId?: number) => {
  const dispatch = useDispatch();
  const hotel = useSelector(selectHotels);

  const loadData = () => {
    dispatch(fetchHotelDetailsStart(hotelId));
    dispatch(fetchGallerystart(hotelId));
    dispatch(
      fetchAvailableRoomsStart({
        hotelId,
        checkIn: dayjs().format('YYYY-MM-DD'),
        checkOut: dayjs().add(1, 'day').format('YYYY-MM-DD'),
      }),
    );
    dispatch(fetchReviewsStart(hotelId));
  };

  return { ...hotel, loadData };
};

export default useHotel;
