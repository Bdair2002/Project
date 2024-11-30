import { getDecodedUser, DecodedUser } from './decodeToken';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
jest.mock('jwt-decode', () => jest.fn());
jest.mock('js-cookie', () => jest.fn());
describe('getDecodedUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return null if no JWT cookie is present', () => {
    Cookies.get = jest.fn().mockReturnValue(null);
    const result = getDecodedUser();
    expect(Cookies.get).toHaveBeenCalledWith('jwt');
    expect(result).toBeNull();
  });

  it('should return the decoded user if a valid JWT cookie is present', () => {
    const mockJwt = 'valid.jwt.token';
    const mockDecodedUser: DecodedUser = {
      user_id: '123',
      given_name: 'John',
      family_name: 'Doe',
      userType: 'admin',
      exp: 1700000000,
    };
    Cookies.get = jest.fn().mockReturnValue(mockJwt);
    jwtDecode.jwtDecode = jest.fn().mockImplementation(() => mockDecodedUser);
    const result = getDecodedUser();
    expect(Cookies.get).toHaveBeenCalledWith('jwt');
    expect(jwtDecode.jwtDecode).toHaveBeenCalledWith(mockJwt);
    expect(result).toEqual(mockDecodedUser);
  });

  it('should throw an error if JWT is malformed', () => {
    const mockJwt = 'malformed.jwt.token';

    Cookies.get = jest.fn().mockReturnValue(mockJwt);
    jwtDecode.jwtDecode = jest.fn().mockImplementation(() => {
      throw new Error('Invalid token');
    });

    expect(() => getDecodedUser()).toThrow('Invalid token');
    expect(Cookies.get).toHaveBeenCalledWith('jwt');
    expect(jwtDecode.jwtDecode).toHaveBeenCalledWith(mockJwt);
  });
});
