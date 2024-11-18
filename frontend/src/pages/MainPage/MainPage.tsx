import React, { useEffect, useState } from 'react';
import './MainPage.scss';
import AddIcon from '@mui/icons-material/Add';
import vector1 from '../../shared/assets/Notes/Vector1.png';
import vector2 from '../../shared/assets/Notes/Vector2.png';
import vector3 from '../../shared/assets/UniversalBlock/Vector1.png';
import vector4 from '../../shared/assets/UniversalBlock/Vector2.png';
import vector5 from '../../shared/assets/UniversalBlock/Vector3.png';
import vector6 from '../../shared/assets/UniversalBlock/Vector4.png';
import ellipse from '../../shared/assets/UniversalBlock/Ellipse1.png';
import vector7 from '../../shared/assets/FloorList/Vector2.png';

interface floor {
  floor: number;
}

export const MainPage = () => {
  const [date, setDate] = useState('');
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

  useEffect(() => {
    const ruDate = new Intl.DateTimeFormat('ru', { day: 'numeric', month: 'numeric', year: 'numeric' })
      .format(new Date())
      .replace(/(\s?\г\.?)/, '');
    setDate(ruDate);
  }, []);

  return (
    <div className='content'>
      <div className='content__notes notes'>
        <div className='notes__blur'>
          <img src={vector1} />
        </div>
        <div className='notes__blur'>
          <img src={vector2} />
        </div>
        <div className='notes__header'>
          <div className='notes__header-block'>
            <p className='notes__header-name'>Примечания</p>
          </div>
          <div className='notes__header-add'>
            <AddIcon sx={{ color: 'white', width: '40px', height: '40px', cursor: 'pointer' }} />
          </div>
        </div>
      </div>
      <div className='content__main'>
        <div className='content__universal-block universal-block'>
          <div className='universal-block__blur'>
            <img src={vector3} />
          </div>
          <div className='universal-block__blur'>
            <img src={vector4} />
          </div>
          <div className='universal-block__header'>
            <div className='universal-block__header-cont'>
              <p className='universal-block__header-name'>Дежурные</p>
              <time className='universal-block__header-time'>{date}</time>
            </div>
          </div>
          <div className='universal-block__cont'>
            <div className='universal-block__employee'>
              <p>Мустафаев Мухаммадали</p>
            </div>
            <div className='universal-block__employee'>
              <p>Сайхаматов Акбар</p>
            </div>
          </div>
        </div>
        <div className='content__universal-block universal-block'>
          <div className='universal-block__blur'>
            <img src={vector5} />
          </div>
          <div className='universal-block__blur'>
            <img src={vector6} />
          </div>
          <div className='universal-block__blur'>
            <img src={ellipse} />
          </div>
          <div className='universal-block__header universal-block__header--small'>
            <div className='universal-block__header-cont'>
              <p className='universal-block__header-name'>Последнее</p>
            </div>
          </div>
          <div className='universal-block__cont universal-block__cont--big'>
            <div className='universal-block__last last'>
              <div className='universal-block__last-act last__act last__act--red'>
                <p>АКТ</p>
              </div>
              <div className='universal-block__last-room last__room'>
                <p>212-2</p>
              </div>
              <div className='universal-block__last-people last__people'>
                <div>
                  <p className='universal-block__last-fullname last__fullname'>Илья Филатов</p>
                </div>
                <div>
                  <p className='universal-block__last-violation last__violation'>
                    Распитие спиртных напитков на территории общежития
                  </p>
                </div>
              </div>
            </div>
            <div className='universal-block__last last'>
              <div className='universal-block__last-act last__act last__act--yellow'>
                <p>ЗМ</p>
              </div>
              <div className='universal-block__last-room last__room'>
                <p>1609-3</p>
              </div>
              <div className='universal-block__last-people last__people'>
                <div>
                  <p className='universal-block__last-fullname last__fullname'>Илья Иванов</p>
                </div>
                <div>
                  <p>Антисанитария в блоке</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
};
