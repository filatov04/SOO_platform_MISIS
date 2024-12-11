import { useState } from 'react';
import './CalendarPage.scss';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import { ContactOperative, TableDuty } from '../../entities';
import { CalendarWeekend } from '../../features';

export interface personDay {
  first_name: string;
  second_name: string;
  phone: string;
  tg: string;
}

export const CalendarPage = () => {
  const [numChoosen, setNumChosen] = useState(1);
  const router = useNavigate();

  function chosenTable(state: number) {
    switch (state) {
      case 1:
        return <TableDuty person={operative} />;
        break;
      case 2:
        return <CalendarWeekend />;
        break;
      case 3:
        return <ContactOperative contact={operative} />;
        break;
    }
  }

  //@ts-ignore
  const [operative, setOperative] = useState<personDay[]>([
    { first_name: 'Мухаммадали', second_name: 'Мустафаев', phone: '79919451059', tg: 'miw4ik' },
    { first_name: 'Мухаммадали', second_name: 'Мустафаев', phone: '79919451059', tg: 'miw4ik' },
    { first_name: 'Мухаммадали', second_name: 'Мустафаев', phone: '79919451059', tg: 'miw4ik' },
    { first_name: 'Мухаммадали', second_name: 'Мустафаев', phone: '79919451059', tg: 'miw4ik' },
    { first_name: 'Мухаммадали', second_name: 'Мустафаев', phone: '79919451059', tg: 'miw4ik' },
    { first_name: 'Мухаммадали', second_name: 'Мустафаев', phone: '79919451059', tg: 'miw4ik' },
    { first_name: 'Мухаммадали', second_name: 'Мустафаев', phone: '79919451059', tg: 'miw4ik' },
    { first_name: 'Мухаммадали', second_name: 'Мустафаев', phone: '79919451059', tg: 'miw4ik' },
    { first_name: 'Мухаммадали', second_name: 'Мустафаев', phone: '79919451059', tg: 'miw4ik' },
    { first_name: 'Мухаммадали', second_name: 'Мустафаев', phone: '79919451059', tg: 'miw4ik' },
    { first_name: 'Мухаммадали', second_name: 'Мустафаев', phone: '79919451059', tg: 'miw4ik' },
    { first_name: 'Мухаммадали', second_name: 'Мустафаев', phone: '79919451059', tg: 'miw4ik' },
    { first_name: 'Мухаммадали', second_name: 'Мустафаев', phone: '79919451059', tg: 'miw4ik' },
    { first_name: 'Мухаммадали', second_name: 'Мустафаев', phone: '79919451059', tg: 'miw4ik' },
    { first_name: 'Мухаммадали', second_name: 'Мустафаев', phone: '79919451059', tg: 'miw4ik' }
  ]);

  return (
    <div className='calendar'>
      <div className='calendar__header'>
        <div className='calendar__arrow-back'>
          <ArrowBackIosNewIcon
            sx={{ color: '#187FF6', width: '50px', height: '50px', cursor: 'pointer' }}
            onClick={() => router(-1)}
          />
        </div>
        <div className='calendar__calendar-type'>
          <ul className='calendar__list-type'>
            <li
              className={numChoosen === 1 ? 'calendar__item-type calendar__item-type--chosen' : 'calendar__item-type'}
              onClick={() => setNumChosen(1)}
            >
              Общий график
            </li>
            <li
              className={numChoosen === 2 ? 'calendar__item-type calendar__item-type--chosen' : 'calendar__item-type'}
              onClick={() => setNumChosen(2)}
            >
              Выбрать даты
            </li>
            <li
              className={numChoosen === 3 ? 'calendar__item-type calendar__item-type--chosen' : 'calendar__item-type'}
              onClick={() => setNumChosen(3)}
            >
              Контакты
            </li>
          </ul>
        </div>
      </div>
      {chosenTable(numChoosen)}
    </div>
  );
};
