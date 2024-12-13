import { useMediaQuery } from '@mui/material';
import { personDay } from '../../pages';
import './TableDuty.scss';
import { SetStateAction } from 'react';

interface TableDutyProps {
  person: personDay[];
  setNumChosen: React.Dispatch<SetStateAction<number>>;
}

export const TableDuty = ({ person, setNumChosen }: TableDutyProps): JSX.Element => {
  const isMobile = useMediaQuery(`(max-width: 768px)`);
  //@ts-ignore
  const day: Array<number> = Array.from({ length: 30 }, (v, k) => k + 1);
  return (
    <div className='calendar__content'>
      <div className='calendar__header-table'>
        <div className='calendar__header-main'>Командир корпуса Мустафаев М.М.</div>
        <div className='calendar__header-main'>График дежурства СОО в общежитии "Горняк-2" Декабрь 2024</div>
      </div>
      <div className='calendar__table-duty table-duty'>
        <table className='table-duty__table'>
          <thead>
            <tr className='table-duty__row-head'>
              <th className='table-duty__item-head table-duty__item-head--border'></th>
              {day.map((elem) => {
                return <th className='table-duty__item-head'>{elem}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {person.map((elem, index) => {
              return (
                <tr>
                  <td className='table-duty__item-name'>
                    {index + 1}. {elem.first_name} {elem.second_name}
                  </td>
                  {day.map(() => {
                    return <td className='table-duty__item-day'> </td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isMobile && (
        <div className='calendar__option'>
          <div className='calendar__option-item'>
            <button className='calendar__option-btn' onClick={() => setNumChosen(2)}>
              Выбор дат
            </button>
          </div>
          <div className='calendar__option-item'>
            <button className='calendar__option-btn' onClick={() => setNumChosen(3)}>
              Контакты
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
