import React, { SetStateAction, useEffect } from 'react';
import vector1 from '../../shared/assets/FloorPage/Room/Vector1.png';
import vector2 from '../../shared/assets/FloorPage/Room/Vector2.png';
import AddIcon from '@mui/icons-material/Add';
import './RoomFloor.scss';
import { violation } from '../../pages';

interface RoomFloorProps {
  floor: number | React.ReactNode;
  number: string;
  setModalIsOpen: React.Dispatch<SetStateAction<boolean>>;
  setRoomViolation: React.Dispatch<SetStateAction<string>>;
  room_violation: violation[];
}

export enum document_type {
  act = 'АКТ',
  warning = 'ЗМ'
}

export enum violation_type {
  drink_alcohol = 'Распитие спиртных напитков на территории общежития',
  passage_alcohol = 'Проход в общежитие в состоянии алкогольного опьянения',
  keeping_alcohol = 'Пронос, хранение или распространение спиртных напитков на территории общежития',
  fire_security = 'Нарушение правил пожарной безопасности',
  electrical_security = 'Нарушение правил электробезопасности',
  noise_mode = 'Нарушение шумового режима в период с 22:00 до 07:00',
  guest_mode = 'Нарушение гостевого режима',
  unsanitation_block = 'Антисанитария в блоке',
  unsanitation_room = 'Антисанитария в комнате',
  unsanitation_general_place = 'Антисанитария в общественном месте',
  break_mode = 'Порча имущества общежития',
  block_thing = 'Хранение лишних вещей, загромождающие комнаты и проходы в коридорах'
}

export const RoomFloor = ({
  room_violation,
  floor,
  number,
  setModalIsOpen,
  setRoomViolation
}: RoomFloorProps): JSX.Element => {
  return (
    <div className='floor-page__room room'>
      <div className='room__blur'>
        <img src={vector1} />
      </div>
      <div className='room__blur'>
        <img src={vector2} />
      </div>
      <div className='floor-page__room-header room__header'>
        <div className='floor-page__room-number room__number'>{number}</div>
        <div className='floor-page__room-add room__add'>
          <AddIcon
            sx={{ color: 'white', width: '50px', height: '50px', cursor: 'pointer' }}
            onClick={() => {
              setModalIsOpen(true);
              setRoomViolation(number);
            }}
          />
        </div>
      </div>
      <div className='room__notes floor-page__room-notes'>
        <div className='room__notes-scroll floor-page__room-notes-scroll'>
          {room_violation.map((elem, index) => {
            return (
              <div key={index} className='room__note floor-page__room-note'>
                {document_type[elem.document_type as keyof typeof document_type]}|{number}-{elem.room_number}|
                {violation_type[elem.violation_type as keyof typeof violation_type]}|{elem.violator_name}|06.11.2024
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
