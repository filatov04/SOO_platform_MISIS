import './CalendarWeekend.scss';
import { useState } from 'react';

interface day {
  [index: number]: number | null;
}

export const CalendarWeekend = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [date, setDate] = useState<day>({});

  const generateCalendarDays = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const firstWeekday = firstDayOfMonth.getDay(); // 0 (вс) - 6 (сб)

    const calendarDays: Array<number | null> = [];

    // Добавление пустых дней в начало месяца
    for (let i = 0; i < (firstWeekday === 0 ? 6 : firstWeekday - 1); i++) {
      calendarDays.push(null);
    }

    // Добавление дней месяца
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }

    //console.log(calendarDays);
    return calendarDays;
  };

  const chooseDay = (id: number) => {
    if (Object.keys(date).length < 4) {
      if (!date[id]) {
        setDate((prev) => ({ ...prev, [id]: calendarDays[id] }));
      } else {
        setDate((prev) => {
          const { [id]: _, ...rest } = prev;
          return rest;
        });
      }
    } else {
      setDate((prev) => {
        const { [id]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className='calendar-weekend'>
      <div className='calendar-weekend__calendar'>
        <div className='calendar-weekend__header'>
          <p className='calendar-weekend__month'>
            {new Date(currentDate.getFullYear(), currentDate.getMonth() + 1).toLocaleDateString('ru-RU', {
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>
        <div className='calendar-weekend__day'>
          <ul className='calendar-weekend__day-list'>
            {['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map((day) => (
              <li key={day} className='calendar-weekend__item'>
                {day}
              </li>
            ))}
          </ul>
        </div>
        <div className='calendar-weekend__day-num'>
          <ul className='calendar-weekend__day-num-list'>
            {calendarDays.map((day, index) => (
              <li
                onClick={day !== null ? () => chooseDay(index) : () => {}}
                key={index}
                className={
                  day
                    ? date[index]
                      ? 'calendar-weekend__day-num-item calendar-weekend__day-num-item--red'
                      : 'calendar-weekend__day-num-item'
                    : 'calendar-weekend__day-num-item calendar-weekend__day-num-item--noClick'
                }
              >
                {day || ''}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='calendar-weekend__confirmation'>
        <button className='calendar-weekend__confirmation-btn'>Подтвердить даты</button>
      </div>
    </div>
  );
};
