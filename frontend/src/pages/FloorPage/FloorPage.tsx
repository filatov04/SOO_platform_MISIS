import React, { useEffect, useRef, useState } from 'react';
import './FloorPage.scss';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import tg from '../../shared/assets/FloorPage/ContactInfo/Telegram.png';
import phone from '../../shared/assets/FloorPage/ContactInfo/phone.png';
import { useNavigate } from 'react-router-dom';
import { RoomFloor } from '../../features/RoomFloor/RoomFloor';
import { useAppSelector } from '../../app/hooks/hooks';
import { headmansInfo } from '../../app/features/Headmans/HeadmansSlice';
import { ModalCreateViolation } from '../../features/ModalCreateViolation';
// import { selectFloor } from '../../app/features/ChooseFloor/ChooseFloorSllice';
// import { useAppSelector } from '../../app/hooks/hooks';

export const FloorPage = () => {
  // const floor = useAppSelector(selectFloor);
  const floor = localStorage.getItem('NumberFloor');
  const router = useNavigate();
  const headmans = useAppSelector(headmansInfo);
  const floorId = localStorage.getItem('FloorId');
  const modalRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    console.log(floorId);
  });

  return (
    <div className='floor-page'>
      <div className='floor-page__info'>
        <div className='floor-page__arrow-back' onClick={() => router('/MainPage')}>
          <ArrowBackIosNewIcon sx={{ color: '#187FF6', width: '68px', height: '68px' }} />
        </div>
        <div className='floor-page__number'> {floor} этаж</div>
        <div className='floor-page__contact-info'>
          <div className='floor-page__contact-elder'>Староста</div>
          <div className='floor-page__contact-name'>
            {floorId && headmans[floorId]?.secondName ? headmans[floorId].secondName : 'found'}{' '}
            {floorId && headmans[floorId]?.firstName ? headmans[floorId].firstName : 'Not'}
          </div>
        </div>
        <div className='floor-page__contact-info'>
          <div className='floor-page__contact-elder'>
            <img src={tg} className='floor-page__tg' />
            {floorId && headmans[floorId]?.tg ? headmans[floorId].tg : 'Not found'}
          </div>
          <div className='floor-page__contact-name'>
            <img src={phone} className='floor-page__phone' />+
            {floorId && headmans[floorId]?.phone ? headmans[floorId].phone : 'Not found'}
          </div>
        </div>
      </div>
      <div className='floor-page__rooms'>
        <RoomFloor floor={floor} number='09' />
        <RoomFloor floor={floor} number='10' />
        <RoomFloor floor={floor} number='11' />
        <RoomFloor floor={floor} number='12' />
        <RoomFloor floor={floor} number='13' />
      </div>
      <ModalCreateViolation
        modalRef={modalRef}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={() => setModalIsOpen(false)}
      />
    </div>
  );
};
