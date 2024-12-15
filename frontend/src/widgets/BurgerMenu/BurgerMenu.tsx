import { SetStateAction } from 'react';
import './BurgerMenu.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks';
import { userInfo } from '../../app/features/User/UserSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { notAuth } from '../../app/features/Auth/AuthSlice';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LogoutIcon from '@mui/icons-material/Logout';
import vector1 from '../../shared/assets/BurgerMenu/Vector1.png';
import vector2 from '../../shared/assets/BurgerMenu/Vector2.png';
import vector3 from '../../shared/assets/BurgerMenu/Vector3.png';
import ellipse from '../../shared/assets/BurgerMenu/Ellipse14.png';

interface BurgerMenuProps {
  active: boolean;
  setActive: React.Dispatch<SetStateAction<boolean>>;
}

export const BurgerMenu = ({ active, setActive }: BurgerMenuProps): JSX.Element => {
  const user = useAppSelector(userInfo);
  const router = useNavigate();
  const dispatch = useAppDispatch();

  async function logout() {
    const data = {};
    await axios
      .post('http://localhost:8000/auth/logout', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      .then(() => {
        dispatch(notAuth());
        localStorage.clear();
      })
      .catch((error) => {
        if (error.status === 401 || error.status === 403) {
          dispatch(notAuth());
          localStorage.clear();
        }
      })
      .finally(() => {
        dispatch(notAuth());
        localStorage.clear();
      });
  }

  return (
    <div className={active ? 'burger-menuWin active' : 'burger-menuWin'} onClick={() => setActive(false)}>
      <div className={active ? 'burger-menu active' : 'burger-menu'} onClick={(e) => e.stopPropagation()}>
        <div className='burger-menu__blur'>
          <img src={vector1} />
        </div>
        <div className='burger-menu__blur'>
          <img src={vector2} />
        </div>
        <div className='burger-menu__blur'>
          <img src={vector3} />
        </div>
        <div className='burger-menu__blur'>
          <img src={ellipse} />
        </div>
        <ul className='burger-menu__list'>
          <li
            className='burger-menu__item'
            onClick={() => {
              logout();
              setActive(!active);
            }}
          >
            <div className='burger-menu__item-icon'>
              <LogoutIcon sx={{ color: '#187FF6' }} className='burger-menu__icon' />
            </div>
            <div className='burger-menu__text'>
              {user.secondName} {user.firstName[0]}. {user.thirdName !== null ? `${user.thirdName[0]}.` : ''}
            </div>
          </li>
          <li
            className='burger-menu__item'
            onClick={() => {
              router('/AllUserPage');
              setActive(!active);
            }}
          >
            <div className='burger-menu__item-icon'>
              <PersonAddAlt1Icon sx={{ color: '#187FF6' }} className='burger-menu__icon' />
            </div>
            <div className='burger-menu__text'>Добавить пользователя</div>
          </li>
          <li className='burger-menu__item' onClick={() => router('/CalendarPage')}>
            <div
              className='burger-menu__item-icon'
              onClick={() => {
                router('/AllUserPage');
                setActive(!active);
              }}
            >
              <CalendarMonthIcon sx={{ color: '#187FF6' }} className='burger-menu__icon' />
            </div>
            <div className='burger-menu__text'>График дежурств</div>
          </li>
        </ul>
      </div>
    </div>
  );
};
