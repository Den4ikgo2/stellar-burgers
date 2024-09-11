import { Children } from 'react';
import { RootState, useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { Navigator, replace, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  authUser?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  children,
  authUser = false
}: ProtectedRouteProps) => {

  const location = useLocation();
  const isAuth = useSelector((state: RootState) => state.userInfo.isAuthChecked)

  if(!isAuth && !authUser) {
    return <Navigate replace to='/login' state={{ from: location}}/>
  }

  return children;
};
