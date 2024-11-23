import React, { useState } from 'react';
import vector7 from '../../shared/assets/FloorList/Vector2.png';
import './Floor.scss';
import { useNavigate } from 'react-router-dom';

export interface floorProps {
  floor: number;
}

interface FloorProps {
  floors: floorProps[];
}

export const Floor = ({ floors }: FloorProps): JSX.Element => {
  const router = useNavigate();
  return (
    <div className='content__floor floor'>
      <div className='floor__scroll'>
        <ul className='content__floor-list floor__list'>
          {floors.map((o, index) => {
            return (
              <li
                key={o.floor}
                className='content__floor-item floor__item'
                onClick={() => {
                  router('/FloorPage');
                  localStorage.setItem('NumberFloor', JSON.stringify(o.floor));
                  localStorage.setItem('FloorId', JSON.stringify(index + 1));
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
