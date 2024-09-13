import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { RootState, useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector((state) => state.userInfo.user.name);
  return <AppHeaderUI userName={userName} />;
};
