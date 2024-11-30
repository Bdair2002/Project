import { apiSlice } from '../apiSlice';
import { apis } from '../../../constants';
import { CityDto } from '../../../api/types';
export const citiesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchCities: builder.query<CityDto[], void>({
      query: () => ({
        url: apis.CITIES_URL,
        method: 'GET',
      }),
    }),
    updateCity: builder.mutation({
      query: ({ id, body }: { id: number; body: Record<string, unknown> }) => ({
        url: `${apis.CITIES_URL}/${id}`,
        method: 'PUT',
        body: body,
      }),
    }),
    deleteCity: builder.mutation({
      query: ({ cityId }: { cityId: number }) => ({
        url: `${apis.CITIES_URL}/${cityId}`,
        method: 'DELETE',
      }),
    }),
    addCity: builder.mutation({
      query: ({ body }: { body: Record<string, unknown> }) => ({
        url: apis.CITIES_URL,
        method: 'POST',
        body: body,
      }),
    }),
  }),
});
export const {
  useFetchCitiesQuery,
  useUpdateCityMutation,
  useDeleteCityMutation,
  useAddCityMutation,
} = citiesApiSlice;
