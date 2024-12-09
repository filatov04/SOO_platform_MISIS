import { useEffect, useRef, useState } from 'react';
import './AllUserPage.scss';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalAddPerson } from '../../features';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks';
import { userInfo } from '../../app/features/User/UserSlice';
import { notAuth } from '../../app/features/Auth/AuthSlice';

export interface user {
  first_name: string;
  second_name: string;
  third_name: string;
  phone: string;
  tg: string;
  role: string;
  dorm_id: number;
}

enum role {
  soo_leader = 'operative',
  admin = 'headmans'
}

export const AllUserPage = () => {
  const router = useNavigate();
  const userInf = useAppSelector(userInfo);
  const modalRef = useRef(null);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<user[]>([]);

  useEffect(() => {
    async function getUser() {
      const get = await axios
        .get('http://localhost:8000/user/get/' + role[userInf.role as keyof typeof role], {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        })
        .then((response) => {
          console.log(response.data);
          setUser([...user, ...response.data]);
        })
        .catch((error) => {
          if (error.status === 401 || error.status === 403) {
            dispatch(notAuth());
          }
        });
    }

    getUser();
  }, []);

  // const delUser = (phone: string) => {
  //   const data = user.filter((a) => a.phone !== phone);
  //   setUser(data);
  // };

  async function delUser(phone: string) {
    const del = await axios
      .post('http://localhost:8000/user/delete/' + phone, JSON.stringify({ numberToDelete: phone }), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      .then(() => {
        const data = user.filter((a) => a.phone !== phone);
        setUser(data);
      })
      .catch((error) => {
        if (error.status === 401 || error.status === 403) {
          dispatch(notAuth());
        }
        console.log(error.message);
      });
  }

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
          {user.map((elem) => (
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
