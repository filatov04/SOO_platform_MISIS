import vector7 from '../../shared/assets/FloorList/Vector2.png';
import './Floor.scss';
import { useNavigate } from 'react-router-dom';
import { FloorHeadman } from '../../pages/MainPage';

interface FloorProps {
  floors: FloorHeadman[];
}

export const Floor = ({ floors }: FloorProps): JSX.Element => {
  const router = useNavigate();
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
                  localStorage.setItem('FloorId', JSON.stringify(o.floor_id));
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
