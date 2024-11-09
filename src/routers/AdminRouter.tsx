import { Navigate, Outlet } from 'react-router-dom';
import { LOGIN } from '../constants/routes';
const UserRouter = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to={LOGIN} />;
};

export default UserRouter;
