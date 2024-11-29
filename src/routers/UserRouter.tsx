import { Navigate, Outlet } from 'react-router-dom';
import { LOGIN } from '../constants/routes';
import Cookies from 'js-cookie';
import { getDecodedUser } from '../utils/decodeToken';
const UserRouter = () => {
  if (!Cookies.get('jwt')) {
    return <Navigate to={LOGIN} />;
  }
  const user = getDecodedUser();

  return user?.userType === 'User' ? <Outlet /> : <Navigate to={LOGIN} />;
};

export default UserRouter;
