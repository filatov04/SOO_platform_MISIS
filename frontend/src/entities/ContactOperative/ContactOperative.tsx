import { useMediaQuery } from '@mui/material';
import { personDay } from '../../pages';
import './ContactOperative.scss';
import React, { SetStateAction } from 'react';

interface ContactOperativeProps {
  contact: personDay[];
  setNumChosen: React.Dispatch<SetStateAction<number>>;
}

export const ContactOperative = ({ contact, setNumChosen }: ContactOperativeProps): JSX.Element => {
  const isMobile = useMediaQuery(`(max-width: 768px)`);
  return (
    <div className='contact-operative'>
      <div className='contact-operative__content'>
        <div className='contact-operative__leader'>
          Командир корпуса Мустафаев М.М. <span className='contact-operative--bigger'>+79919451059</span>{' '}
          <span className='contact-operative--bigger'>@miw4ik</span>
        </div>
        <div className='contact-operative__operative'>
          <ul className='contact-operative__list'>
            {contact.map((elem, index) => {
              return (
                <li className='contact-operative__item'>
                  <div className='contact-operative__operative-name'>
                    {index + 1}. {elem.second_name} {elem.first_name}
                  </div>
                  <div className='contact-operative__operative-phone'>+{elem.phone}</div>
                  <div className='contact-operative__operative-tg'>@{elem.tg}</div>
                </li>
              );
            })}
          </ul>
        </div>
        {isMobile && (
          <div className='contact-operative__option'>
            <div className='contact-operative__option-item'>
              <button className='contact-operative__option-btn' onClick={() => setNumChosen(2)}>
                Выбор дат
              </button>
            </div>
            <div className='contact-operative__option-item'>
              <button className='contact-operative__option-btn' onClick={() => setNumChosen(1)}>
                График
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
