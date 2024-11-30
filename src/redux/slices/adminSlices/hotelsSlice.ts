import { apiSlice } from '../apiSlice';
import { apis } from '../../../constants';
import { HotelDto } from '../../../api/types';
interface hotelsResponse extends HotelDto {
  name: string;
}
export const hotelsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchHotels: builder.query<hotelsResponse[], void>({
      query: () => ({
        url: apis.HOTELS_URL,
        method: 'GET',
      }),
    }),
    updateHotel: builder.mutation({
      query: ({ id, body }: { id: number; body: Record<string, unknown> }) => ({
        url: `${apis.HOTELS_URL}/${id}`,
        method: 'PUT',
        body: body,
      }),
    }),
    deleteHotel: builder.mutation({
      query: ({ hotelId }: { hotelId: number }) => ({
        url: `${apis.HOTELS_URL}/${hotelId}`,
        method: 'DELETE',
      }),
    }),
    addHotel: builder.mutation({
      query: ({ body }: { body: Record<string, unknown> }) => ({
        url: apis.HOTELS_URL,
        method: 'POST',
        body: body,
      }),
    }),
  }),
});
export const {
  useFetchHotelsQuery,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
  useAddHotelMutation,
} = hotelsApiSlice;
