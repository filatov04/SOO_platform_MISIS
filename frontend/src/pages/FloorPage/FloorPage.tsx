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
import axios from 'axios';

export interface violation {
  document_type: string;
  violator_name: string;
  violation_type: string;
  description: string;
  room_id: number;
  witness: string;
}

interface roomsViolation {
  room_id: number;
  floor_id: number;
  block_number: number;
  room_number: number;
  violations: violation[];
}

export const FloorPage = () => {
  const floor = localStorage.getItem('NumberFloor');
  const router = useNavigate();
  const headmans = useAppSelector(headmansInfo);
  const floorId = localStorage.getItem('FloorId');
  const modalRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [roomViolation, setRoomViolation] = useState('');
  const [roomsWithViolation, setRoomsWithViolations] = useState<roomsViolation[]>([]);
  let blockNumber: number = 0;

  useEffect(() => {
    async function getRoomWithViolation() {
      const getRoom = await axios
        .get('http://localhost:8000/violations/rooms/get/' + floorId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        })
        .then((response) => {
          setRoomsWithViolations(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    getRoomWithViolation();
  }, []);

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
        {roomsWithViolation.map((elem, index) => {
          if (elem.block_number !== blockNumber) {
            blockNumber = elem.block_number;
            return (
              <RoomFloor
                violations={elem.violations}
                floor={floor}
                number={elem.block_number.toString()}
                setModalIsOpen={setModalIsOpen}
                setRoomViolation={setRoomViolation}
              />
            );
          }
        })}
      </div>
      <ModalCreateViolation
        room={roomViolation}
        modalRef={modalRef}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
    </div>
  );
};
