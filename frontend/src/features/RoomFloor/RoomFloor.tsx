import React from 'react';
import vector1 from '../../shared/assets/FloorPage/Room/Vector1.png';
import vector2 from '../../shared/assets/FloorPage/Room/Vector2.png';
import AddIcon from '@mui/icons-material/Add';
import './RoomFloor.scss';

interface RoomFloorProps {
  floor: number | React.ReactNode;
  number: string;
}

export const RoomFloor = ({ floor, number }: RoomFloorProps): JSX.Element => {
  return (
    <div className='floor-page__room room'>
      <div className='room__blur'>
        <img src={vector1} />
      </div>
      <div className='room__blur'>
        <img src={vector2} />
      </div>
      <div className='floor-page__room-header room__header'>
        <div className='floor-page__room-number room__number'>
          {floor}
          {number}
        </div>
        <div className='floor-page__room-add room__add'>
          <AddIcon sx={{ color: 'white', width: '50px', height: '50px', cursor: 'pointer' }} />
        </div>
      </div>
      <div className='room__notes floor-page__room-notes'>
        <div className='room__note floor-page__room-note'>
          АКТ|{floor}
          {number}-3|Антисанитария в блоке|Иванов Илья|06.11.2024
        </div>
      </div>
    </div>
  );
};
