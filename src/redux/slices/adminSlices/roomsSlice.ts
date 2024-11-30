import { apiSlice } from '../apiSlice';
import { apis } from '../../../constants';
import { RoomAvailabilityResultDto } from '../../../api/types';
export const roomsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchRooms: builder.query<RoomAvailabilityResultDto[], number>({
      query: hotelId => ({
        url: `${apis.HOTELS_URL}/${hotelId}/rooms?checkInDate=0&checkOutDate=0`,
        method: 'GET',
      }),
    }),
    updateRoom: builder.mutation({
      query: ({ id, body }: { id: number; body: Record<string, unknown> }) => ({
        url: `${apis.ROOMS_URL}/${id}`,
        method: 'PUT',
        body: body,
      }),
    }),
    deleteRoom: builder.mutation({
      query: ({ roomId }: { roomId: number }) => ({
        url: `${apis.ROOMS_URL}/${roomId}`,
        method: 'DELETE',
      }),
    }),
    addRoom: builder.mutation({
      query: ({ hotelId, body }: { hotelId: number; body: Record<string, unknown> }) => ({
        url: `${apis.HOTELS_URL}/${hotelId}/rooms`,
        method: 'POST',
        body: body,
      }),
    }),
  }),
});
export const {
  useFetchRoomsQuery,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
  useAddRoomMutation,
} = roomsApiSlice;
