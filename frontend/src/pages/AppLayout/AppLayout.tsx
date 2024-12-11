import { FooterMobile, NavigationBar } from '../../widgets';
import { Outlet } from 'react-router-dom';
import './AppLayout.scss';
import { useMediaQuery } from '@mui/material';
import { useAppSelector } from '../../app/hooks/hooks';
import { AuthorizationValue } from '../../app/features/Auth/AuthSlice';

export const AppLayout = () => {
  const isMobile = useMediaQuery(`(max-width: 768px)`);
  const auth = useAppSelector(AuthorizationValue);
  return (
    <div className='app-layout'>
      <header className='app-header'>
        <NavigationBar />
      </header>
      <main className='main-content'>
        <Outlet />
      </main>
      <footer className='app-footer'>{isMobile && auth ? <FooterMobile /> : <></>}</footer>
    </div>
  );
};
