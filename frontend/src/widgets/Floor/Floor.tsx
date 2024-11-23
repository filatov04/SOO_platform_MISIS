import React, { useState } from 'react';
import vector7 from '../../shared/assets/FloorList/Vector2.png';
import './Floor.scss';
import { useNavigate } from 'react-router-dom';
// import { choose } from '../../app/features/ChooseFloor/ChooseFloorSllice';
import { useAppDispatch } from '../../app/hooks/hooks';

export interface floorProps {
  floor: number;
}

interface FloorProps {
  floors: floorProps[];
}

export const Floor = ({ floors }: FloorProps): JSX.Element => {
  // const dispatch = useAppDispatch();
  const router = useNavigate();
  // const [floorArray, setFloorArray] = useState<floorProps[]>([
  //   { floor: 2 },
  //   { floor: 3 },
  //   { floor: 4 },
  //   { floor: 5 },
  //   { floor: 6 },
  //   { floor: 7 },
  //   { floor: 8 },
  //   { floor: 9 },
  //   { floor: 10 },
  //   { floor: 11 },
  //   { floor: 12 },
  //   { floor: 13 },
  //   { floor: 14 },
  //   { floor: 15 },
  //   { floor: 16 }
  // ]);
  return (
    <div className='content__floor floor'>
      <div className='floor__scroll'>
        <ul className='content__floor-list floor__list'>
          {floors.map((o) => {
            return (
              <li
                key={o.floor}
                className='content__floor-item floor__item'
                onClick={() => {
                  router('/FloorPage');
                  localStorage.setItem('NumberFloor', JSON.stringify(o.floor));
                }}
              >
                <div className='floor__blur'>
                  <img src={vector7} />
                </div>
                <p className='floor__item-text'>{o.floor} этаж</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
