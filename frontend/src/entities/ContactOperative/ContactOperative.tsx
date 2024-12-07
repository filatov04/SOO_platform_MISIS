import { personDay } from '../../pages';
import './ContactOperative.scss';

interface ContactOperativeProps {
  contact: personDay[];
}

export const ContactOperative = ({ contact }: ContactOperativeProps): JSX.Element => {
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
                    {index + 1} {elem.second_name} {elem.first_name}
                  </div>
                  <div className='contact-operative__operative-phone'>+{elem.phone}</div>
                  <div className='contact-operative__operative-tg'>@{elem.tg}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
