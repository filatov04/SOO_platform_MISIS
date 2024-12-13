import { useEffect, useRef, useState } from 'react';
import './FloorPage.scss';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import tg from '../../shared/assets/FloorPage/ContactInfo/Telegram.png';
import { useNavigate } from 'react-router-dom';
import { RoomFloor } from '../../features/RoomFloor/RoomFloor';
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks';
import { headmansInfo } from '../../app/features/Headmans/HeadmansSlice';
import { ModalCreateViolation } from '../../features';
import axios from 'axios';
import { notAuth } from '../../app/features/Auth/AuthSlice';
import { Spinner } from '../../shared';
import { useMediaQuery } from '@mui/material';
import vector1 from '../../shared/assets/FloorPage/ContactInfoMobile/Vector1.png';
import vector2 from '../../shared/assets/FloorPage/ContactInfoMobile/Vector2.png';
import ellipse from '../../shared/assets/FloorPage/ContactInfoMobile/Ellipse14.png';

interface roomData {
  document_type: string;
  violator_name: string;
  violation_type: string;
  description: string;
  room_id: number;
  witness: string;
  created_at: string;
}

interface roomsData {
  room_id: number;
  floor_id: number;
  block_number: number;
  room_number: number;
  violations: roomData[];
}

export interface violation {
  document_type: string;
  violator_name: string;
  violation_type: string;
  description: string;
  room_id: number;
  room_number: number | null;
  witness: string;
  created_at: string;
}

export interface blockViolation {
  [block_number: number]: violation[];
}

export interface roomNumberID {
  [roomNumber: number]: number | null;
}

export interface blockNumberRoomNumber {
  [blockNumber: number]: roomNumberID;
}

export const formatDateString = (input: string): string => {
  const date = new Date(input);

  // Получаем компоненты даты
  const day = date.getDate().toString().padStart(2, '0'); // Два символа для дня
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Месяцы 0-индексированные
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const FloorPage = () => {
  const floor = localStorage.getItem('NumberFloor');
  const router = useNavigate();
  const isMobile = useMediaQuery(`(max-width:768px)`);
  const dispatch = useAppDispatch();
  const headmans = useAppSelector(headmansInfo);
  const [isLoading, setIsLoading] = useState(false);
  const floorId = localStorage.getItem('FloorId');
  const modalRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [roomViolation, setRoomViolation] = useState('');
  const [roomsWithViolation, setRoomsWithViolations] = useState<blockViolation>({});
  const [roomsID, setRoomsID] = useState<blockNumberRoomNumber>({});

  function mergeRoomsViolations(data: roomsData[]) {
    const blockMap: blockViolation = {};
    let roomID: blockNumberRoomNumber = {};
    for (const room of data) {
      let violation: violation[] = [];
      let roomNumber = room.room_number;
      if (!roomID[room.block_number]) {
        roomID[room.block_number] = { [room.room_number]: room.room_id };
      } else {
        roomID[room.block_number] = { ...roomID[room.block_number], [room.room_number]: room.room_id };
      }
      if (room.violations.length == 0) {
        blockMap[room.block_number] = [...(blockMap[room.block_number] || []), ...violation];
      } else {
        for (const violations of room.violations) {
          violation.push({
            document_type: violations.document_type,
            violator_name: violations.violator_name,
            violation_type: violations.violation_type,
            description: violations.description,
            room_id: violations.room_id,
            room_number: roomNumber,
            witness: violations.witness,
            created_at: formatDateString(violations.created_at)
          });
          blockMap[room.block_number] = [...(blockMap[room.block_number] || []), ...violation];
        }
      }
    }

    setRoomsID(roomID);
    setRoomsWithViolations(blockMap);
  }

  useEffect(() => {
    async function getRoomWithViolation() {
      await axios
        .get('http://localhost:8000/violations/rooms/get/' + floorId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        })
        .then((response) => {
          mergeRoomsViolations(response.data);
          setIsLoading(true);
        })
        .catch((error) => {
          if (error.status === 401 || error.status === 403) {
            dispatch(notAuth());
          }
        });
    }

    getRoomWithViolation();
  }, []);

  if (isLoading) {
    return (
      <div className='floor-page'>
        <div className='floor-page__info'>
          {isMobile ? (
            <div className='floor-page__mobile-header'>
              <div className='floor-page__blur'>
                <img src={vector1} />
              </div>
              <div className='floor-page__blur'>
                <img src={vector2} />
              </div>
              <div className='floor-page__blur'>
                <img src={ellipse} />
              </div>
              <div className='floor-page__mobile-headinf'>
                <div className='floor-page__mobile-floor'>{floor} этаж</div>
                <div className='floor-page__mobile-headman'>
                  {floorId && headmans[floorId]?.secondName ? headmans[floorId].secondName : 'Not'}{' '}
                  {floorId && headmans[floorId]?.firstName ? `${headmans[floorId].firstName[0]}.` : 'found'}
                  {floorId && headmans[floorId]?.thirdName ? `${headmans[floorId].thirdName[0]}.` : ''}
                </div>
              </div>
              <div className='floor-page__mobile-headinf'>
                <div className='floor-page__mobile-tg'>
                  <img src={tg} className='floor-page__tg' />
                  {floorId && headmans[floorId]?.tg ? headmans[floorId].tg : 'Not Found'}
                </div>
                <div className='floor-page__mobile-phone'>
                  {floorId && headmans[floorId]?.phone ? `+${headmans[floorId].phone}` : 'Not found'}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className='floor-page__arrow-back' onClick={() => router('/MainPage')}>
                <ArrowBackIosNewIcon
                  sx={{
                    color: '#187FF6',
                    width: '68px',
                    height: '68px',
                    '@media (max-width: 1280px)': { width: '53px', height: '53px' },
                    '@media (max-width: 1000px)': { width: '45px', height: '45px' },
                    '@media (max-width: 768px)': { width: '55px', height: '100px' }
                  }}
                />
              </div>
              <div className='floor-page__number'> {floor} этаж</div>
              <div className='floor-page__contact-info'>
                <div className='floor-page__contact-elder'>Староста</div>
                <div className='floor-page__contact-name'>
                  {floorId && headmans[floorId]?.secondName ? headmans[floorId].secondName : 'Not'}{' '}
                  {floorId && headmans[floorId]?.firstName ? headmans[floorId].firstName : 'found'}
                </div>
              </div>
              <div className='floor-page__contact-info'>
                <div className='floor-page__contact-elder'>
                  <img src={tg} className='floor-page__tg' />
                  {floorId && headmans[floorId]?.tg ? headmans[floorId].tg : 'Not Found'}
                </div>
                <div className='floor-page__contact-name'>
                  {/* <img src={phone} className='floor-page__phone' /> */}
                  {floorId && headmans[floorId]?.phone ? `+${headmans[floorId].phone}` : 'Not found'}
                </div>
              </div>
            </>
          )}
        </div>
        <div className='floor-page__rooms'>
          {Object.entries(roomsWithViolation).map(([key, value]) => {
            return (
              <RoomFloor
                number={key}
                setModalIsOpen={setModalIsOpen}
                setRoomViolation={setRoomViolation}
                room_violation={value}
              />
            );
          })}
        </div>
        <ModalCreateViolation
          setRoomsWithViolations={setRoomsWithViolations}
          //roomsWithViolation={roomsWithViolation}
          room={roomViolation}
          roomsID={roomsID}
          modalRef={modalRef}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </div>
    );
  } else {
    return <Spinner />;
  }
};
