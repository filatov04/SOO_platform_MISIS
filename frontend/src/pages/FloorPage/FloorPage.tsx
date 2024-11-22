import React, { useEffect } from 'react';
import './FloorPage.scss';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import tg from '../../shared/assets/FloorPage/ContactInfo/Telegram.png';
import phone from '../../shared/assets/FloorPage/ContactInfo/phone.png';
import { useNavigate } from 'react-router-dom';
import { RoomFloor } from '../../features/RoomFloor/RoomFloor';
// import { selectFloor } from '../../app/features/ChooseFloor/ChooseFloorSllice';
// import { useAppSelector } from '../../app/hooks/hooks';

export const FloorPage = () => {
  // const floor = useAppSelector(selectFloor);
  const floor = localStorage.getItem('NumberFloor');
  const router = useNavigate();

  useEffect(() => {});
  return (
    <div className='floor-page'>
      <div className='floor-page__info'>
        <div className='floor-page__arrow-back' onClick={() => router('/MainPage')}>
          <ArrowBackIosNewIcon sx={{ color: '#187FF6', width: '68px', height: '68px' }} />
        </div>
        <div className='floor-page__number'> {floor} этаж</div>
        <div className='floor-page__contact-info'>
          <div className='floor-page__contact-elder'>Староста</div>
          <div className='floor-page__contact-name'>Сайхаматов Акбар</div>
        </div>
        <div className='floor-page__contact-info'>
          <div className='floor-page__contact-elder'>
            <img src={tg} className='floor-page__tg' />
            @akbar
          </div>
          <div className='floor-page__contact-name'>
            <img src={phone} className='floor-page__phone' />
            +9919451059
          </div>
        </div>
      </div>
      <div className='floor-page__rooms'>
        <RoomFloor floor={floor} number='09' />
      </div>
    </div>
  );
};
