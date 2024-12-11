import './NavigationBar.scss';
import logo from '../../shared/assets/NavigationBar/logo/logo.png';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks';
import { AuthorizationValue, notAuth } from '../../app/features/Auth/AuthSlice';
import { userInfo } from '../../app/features/User/UserSlice';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

export const NavigationBar = () => {
  const auth = useAppSelector(AuthorizationValue);
  const user = useAppSelector(userInfo);
  const dispatch = useAppDispatch();
  //const [isAdmin, setIsAdmin] = useState(true);
  const router = useNavigate();
  const isMobile = useMediaQuery(`(max-width:768px)`);
  return (
    <div className='navbar'>
      <div className='navbar__content'>
        <div className='navbar__logo' onClick={auth ? () => router('/MainPage') : () => {}}>
          <img src={logo} className='logo' />
        </div>
        {isMobile && auth ? (
          <div className='navbar__list-panel'>
            <div className='navbar__item-panel'>
              <PersonIcon
                sx={{
                  cursor: 'pointer',
                  color: 'white',
                  width: '63px',
                  height: '71px',
                  '@media (max-width: 1280px)': { width: '52px', height: '63px' },
                  '@media (max-width: 1000px)': { width: '45px', height: '55px' },
                  '@media (max-width: 768px)': { width: '55px', height: '100px' }
                }}
              />
            </div>
          </div>
        ) : (
          <div className='navbar__list-panel'>
            {auth ? (
              <>
                <div className='navbar__item-panel' onClick={() => router('/CalendarPage')}>
                  <CalendarMonthIcon
                    sx={{
                      cursor: 'pointer',
                      color: 'white',
                      width: '63px',
                      height: '71px',
                      '@media (max-width: 1280px)': { width: '52px', height: '63px' },
                      '@media (max-width: 1000px)': { width: '45px', height: '55px' }
                    }}
                  />
                </div>
                {user.role === 'soo_leader' || user.role === 'admin' ? (
                  <div className='navbar__item-panel' onClick={() => router('/AllUserPage')}>
                    <PersonAddAlt1Icon
                      sx={{
                        cursor: 'pointer',
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
                  <p className='navbar__name'>
                    {user.secondName} {user.firstName[0]}. {user.thirdName !== null ? `${user.thirdName[0]}.` : ''}
                  </p>
                  <LogoutIcon
                    onClick={() => {
                      dispatch(notAuth());
                      localStorage.clear();
                    }}
                    sx={{
                      cursor: 'pointer',
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
        )}
      </div>
    </div>
  );
};
