import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/users';

export const PrivateRoute = ({ children }) => {

  const isAuth = getCurrentUser();

  if(!isAuth) {
    return <Navigate to='/' />
  }

  return children;
}