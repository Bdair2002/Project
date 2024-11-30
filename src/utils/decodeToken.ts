import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export interface DecodedUser {
  user_id: string;
  given_name: string;
  family_name: string;
  userType: string;
  exp: number;
}

export function getDecodedUser(): DecodedUser | null {
  const jwt = Cookies.get('jwt');
  if (jwt) {
    const decoded: DecodedUser = jwtDecode(jwt);
    return decoded;
  }
  return null;
}
