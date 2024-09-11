import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/Slices/userSlice';
import { Navigate, NavLink } from 'react-router-dom';
import { ProtectedRoute } from 'src/components/protectedRoute/protectedRoute';
import { ConstructorPage } from '../constructor-page';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch()

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({email: email, password: password}))
  };

  const isAuth = useSelector((state: RootState) => state.userInfo.isAuthChecked)

  if(isAuth){
    return <ConstructorPage />
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
