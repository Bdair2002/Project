import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../index';
import { logOut, loginUser } from '../redux/slices/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();

  const authState = useSelector((state: RootState) => state.auth);

  const login = (username: string, password: string) => {
    dispatch(loginUser({ username, password }));
  };

  const logout = () => {
    dispatch(logOut());
  };

  return {
    ...authState,
    login,
    logout,
  };
};

export default useAuth;
