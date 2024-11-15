import React from 'react';
import { NavigationBar } from '../../widgets';
import { Outlet } from 'react-router-dom';
import './AppLayout.scss';

export const AppLayout = () => {
  return (
    <div className='app-layout'>
      <header className='app-header'>
        <NavigationBar />
      </header>
      <main className='main-content'>
        <Outlet />
      </main>
      <footer className='app-footer'>
        <></>
      </footer>
    </div>
  );
};
