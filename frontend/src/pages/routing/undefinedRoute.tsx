import { useAppSelector } from '../../app/hooks/hooks';
import { AuthorizationValue } from '../../app/features/Auth/AuthSlice';
import { Navigate } from 'react-router-dom';

export const UndefinedRoute = () => {
  const auth = useAppSelector(AuthorizationValue);
  return auth ? null : <Navigate to={'/LoginPage'} />;
};
