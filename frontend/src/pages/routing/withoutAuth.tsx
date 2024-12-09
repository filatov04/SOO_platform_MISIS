import React from 'react';
import { useAppSelector } from '../../app/hooks/hooks';
import { AuthorizationValue } from '../../app/features/Auth/AuthSlice';
import { Navigate } from 'react-router-dom';

export const WithoutAuth = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const auth = useAppSelector(AuthorizationValue);

  const NotAuthenicatedComponent: React.FC<P> = (props: P) => {
    if (auth) {
      return <Navigate to='/MainPage' />;
    }

    return <WrappedComponent {...props} />;
  };

  return NotAuthenicatedComponent;
};
