import React, { useState } from 'react';
import './NavigationBar.scss';
import logo from '../../shared/assets/NavigationBar/logo/logo.png';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LogoutIcon from '@mui/icons-material/Logout';

export const NavigationBar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  return (
    <div className='navbar'>
      <div className='navbar__content'>
        <div className='navbar__logo'>
          <img src={logo} className='logo' />
        </div>
        <div className='navbar__list-panel'>
          {isAuth ? (
            <>
              <div className='navbar__item-panel'>
                <CalendarMonthIcon
                  sx={{
                    color: 'white',
                    width: '63px',
                    height: '71px',
                    '@media (max-width: 1280px)': { width: '52px', height: '63px' },
                    '@media (max-width: 1000px)': { width: '45px', height: '55px' }
                  }}
                />
              </div>
              {isAdmin ? (
                <div className='navbar__item-panel'>
                  <PersonAddAlt1Icon
                    sx={{
                      color: 'white',
                      width: '63px',
                      height: '71px',
                      '@media (max-width: 1280px)': { width: '52px', height: '63px' },
                      '@media (max-width: 1000px)': { width: '45px', height: '55px' }
                    }}
                  />
                </div>
              ) : (
                <></>
              )}
              <div className='navbar__item-panel'>
                <p className='navbar__name'>Мустафаев М.М</p>
                <LogoutIcon
                  sx={{
                    color: 'white',
                    width: '63px',
                    height: '71px',
                    '@media (max-width: 1280px)': { width: '52px', height: '63px' },
                    '@media (max-width: 1000px)': { width: '45px', height: '55px' }
                  }}
                />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
