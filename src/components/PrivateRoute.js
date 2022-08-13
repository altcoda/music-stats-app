import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children, isAuth }) => {
  return isAuth ? children : <Navigate to='/' />;
}