import React from 'react';
import { NavigationBar } from '../../widgets';
import { Outlet } from 'react-router-dom';
import './AppLayout.scss';
import { useMediaQuery } from '@mui/material';

export const AppLayout = () => {
  const isMobile = useMediaQuery(`(max-width: 768px)`);
  return (
    <div className='app-layout'>
      {isMobile ? (
        <></>
      ) : (
        <header className='app-header'>
          <NavigationBar />
        </header>
      )}
      <main className='main-content'>
        <Outlet />
      </main>
      <footer className='app-footer'>
        <></>
      </footer>
    </div>
  );
};
