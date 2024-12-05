import React, { useRef, useState } from 'react';
import './AllUserPage.scss';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalAddPerson } from '../../features';
import { useNavigate } from 'react-router-dom';

export interface user {
  first_name: string;
  second_name: string;
  third_name: string;
  phone: string;
  tg: string;
  role: string;
  dorm_id: number;
}

export const AllUserPage = () => {
  const router = useNavigate();
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<user[]>([
    {
      first_name: 'Ivan',
      second_name: 'Ivanov',
      third_name: 'Ivanovich',
      phone: '78005553535',
      tg: '@example',
      role: 'operative',
      dorm_id: 1
    },
    {
      first_name: 'Ilya',
      second_name: 'Filatov',
      third_name: 'Artemovich',
      phone: '71231234323',
      tg: '@example',
      role: 'operative',
      dorm_id: 1
    }
  ]);

  const delUser = (phone: string) => {
    const data = user.filter((a) => a.phone !== phone);
    setUser(data);
  };

  return (
    <div className='users'>
      <div className='users__header'>
        <ArrowBackIosNewIcon
          sx={{ color: '#187FF6', width: '50px', height: '50px', cursor: 'pointer' }}
          onClick={() => router(-1)}
        />
      </div>
      <div className='users__content'>
        <ul className='users__list'>
          {user.map((elem, index) => (
            <li key={elem.phone} className='users__item'>
              <div className='users__name'>
                {elem.second_name} {elem.first_name}
              </div>
              <button className='users__del' onClick={() => delUser(elem.phone)}>
                <DeleteIcon sx={{ color: 'white' }} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className='users__add'>
        <button className='users__add-btn' onClick={() => setIsOpen(true)}>
          Добавить
        </button>
      </div>
      <ModalAddPerson dialogRef={modalRef} setIsOpen={setIsOpen} isOpen={isOpen} setUsers={setUser} />
    </div>
  );
};
