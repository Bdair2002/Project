import { Navigate } from 'react-router-dom';
import { LOGIN } from '../constants/routes';
interface Props {
  children: React.ReactElement | null;
}
const UserRouter = ({ children }: Props) => {
  const token = localStorage.getItem('token');
  return token ? { children } : <Navigate to={LOGIN} />;
};

export default UserRouter;
