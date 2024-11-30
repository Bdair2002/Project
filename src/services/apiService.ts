import { Api } from '../api/Api';
import Cookies from 'js-cookie';
export const createApiService = () => {
  const api = new Api({
    baseUrl: 'https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net',
  });
  const jwt = Cookies.get('jwt');
  if (jwt) {
    api.setSecurityData({ token: jwt });
  }

  return api;
};
