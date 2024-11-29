import React, { useState } from 'react';
import vector7 from '../../shared/assets/FloorList/Vector2.png';
import './Floor.scss';

interface floor {
  floor: number;
}

export const Floor = () => {
  const [floorArray, setFloorArray] = useState<floor[]>([
    { floor: 2 },
    { floor: 3 },
    { floor: 4 },
    { floor: 5 },
    { floor: 6 },
    { floor: 7 },
    { floor: 8 },
    { floor: 9 },
    { floor: 10 },
    { floor: 11 },
    { floor: 12 },
    { floor: 13 },
    { floor: 14 },
    { floor: 15 },
    { floor: 16 }
  ]);
  return (
    <div className='content__floor floor'>
      <div className='floor__scroll'>
        <ul className='content__floor-list floor__list'>
          {floorArray.map((o) => {
            return (
              <li key={o.floor} className='content__floor-item floor__item'>
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
