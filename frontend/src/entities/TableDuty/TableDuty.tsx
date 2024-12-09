import { personDay } from '../../pages';
import './TableDuty.scss';

interface TableDutyProps {
  person: personDay[];
}

export const TableDuty = ({ person }: TableDutyProps): JSX.Element => {
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
              {day.map((elem, index) => {
                return <th className='table-duty__item-head'>{elem}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {person.map((elem, index) => {
              return (
                <tr>
                  <td className='table-duty__item-name'>
                    {index + 1} {elem.first_name} {elem.second_name}
                  </td>
                  {day.map((elem, index) => {
                    return <td className='table-duty__item-day'> </td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
