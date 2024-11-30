import { http, HttpResponse } from 'msw';
import { mockedSuccessUser, mockedSuccessAdmin } from './data/loginMockData';
import { AuthenticationRequestBody } from '../../api/types';

export const handlers = [
  http.post('*/authenticate', async ({ request }) => {
    const body = (await request.json()) as AuthenticationRequestBody;
    if (body.userName === 'admin' && body.password === 'admin') {
      return HttpResponse.json({
        ...mockedSuccessAdmin,
      });
    } else if (body.userName === 'user' && body.password === 'user') {
      return HttpResponse.json({
        ...mockedSuccessUser,
      });
    }
    return HttpResponse.json({
      status: 401,
      title: 'Unauthorized',
    });
  }),
  http.post('*/search', async ({ request }) => {
    const body = (await request.json()) as { city: string };
    if (body.city === 'Ramallah')
      return HttpResponse.json([
        {
          hotelId: 1,
          hotelName: 'Plaza Hotel',
          starRating: 5,
          latitude: 12.32342342,
          longitude: 32.23245675,
          roomPrice: 100.0,
          roomType: 'Double',
          cityName: 'Ramallah',
          roomPhotoUrl:
            'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          discount: 0.2,
          amenities: [
            {
              id: 0,
              name: 'wifi',
              description: 'Very fast wifi in the room.',
            },
            {
              id: 0,
              name: 'Room Service',
              description: 'Very Fast room service available.',
            },
          ],
        },
      ]);
  }),
];
