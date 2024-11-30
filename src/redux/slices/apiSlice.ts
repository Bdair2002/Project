import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
import Cookies from 'js-cookie';
export const baseQuery = fetchBaseQuery({
  baseUrl: 'https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net',

  prepareHeaders: headers => {
    const token = Cookies.get('jwt');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
export const apiSlice = createApi({
  tagTypes: ['Cities', 'Hotels', 'Rooms'],
  baseQuery,
  endpoints: () => ({}),
});
