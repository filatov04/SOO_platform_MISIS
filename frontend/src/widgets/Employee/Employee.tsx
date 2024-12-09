import { useState, useEffect } from 'react';
import './Employee.scss';
import vector3 from '../../shared/assets/UniversalBlock/Vector1.png';
import vector4 from '../../shared/assets/UniversalBlock/Vector2.png';

export const Employee = (): JSX.Element => {
  const [date, setDate] = useState('');

  useEffect(() => {
    const ruDate = new Intl.DateTimeFormat('ru', { day: 'numeric', month: 'numeric', year: 'numeric' })
      .format(new Date())
      .replace(/(\s?\г\.?)/, '');
    setDate(ruDate);
  }, []);

  return (
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
  );
};
