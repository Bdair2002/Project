import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store/store';
import { logOut, loginUser } from '../redux/slices/authSlice';
import { selectAuth } from '../selectors/AuthSelectors/SelectUser';

const useAuth = () => {
  const dispatch = useDispatch();

  const authState = useSelector(selectAuth);

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
