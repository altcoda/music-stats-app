import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children, isAuth }) => {
  if(isAuth && isAuth === null) {
    return <Navigate to='/' />
  }
  return children;
}