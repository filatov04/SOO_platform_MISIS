import { RefObject, useEffect, useState } from 'react';
import arrowBack from '../../shared/assets/ModalCreateNotes/ArrowBack.png';
import { user } from '../../pages/AllUserPage';
import './ModalAddPerson.scss';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks';
import { userInfo } from '../../app/features/User/UserSlice';
import axios from 'axios';
import ellipse from '../../shared/assets/Modal/Ellipse.png';
import vector1 from '../../shared/assets/Modal/Vector1.png';
import vector2 from '../../shared/assets/Modal/Vector2.png';
import { notAuth } from '../../app/features/Auth/AuthSlice';

interface ModalAddPersonProps {
  isOpen: boolean;
  dialogRef: RefObject<HTMLDialogElement>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUsers: React.Dispatch<React.SetStateAction<user[]>>;
}

interface person {
  first_name: string;
  second_name: string;
  third_name: string;
  phone: string;
  tg: string;
  role: string;
  dorm_id: number;
  password: string;
}

export const ModalAddPerson = ({ isOpen, dialogRef, setIsOpen, setUsers }: ModalAddPersonProps) => {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [thirdName, setThirdName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [tg, setTg] = useState('');
  const user = useAppSelector(userInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm({ mode: 'onChange' });

  const onSubmit = (e: any) => {
    const data: person = {
      first_name: e.first_name,
      second_name: e.second_name,
      third_name: e.third_name,
      phone: e.phone,
      tg: e.tg,
      role: 'operative',
      dorm_id: user.dormId,
      password: e.password
    };
    setUsers((prev) => [
      {
        first_name: data.first_name,
        second_name: data.second_name,
        third_name: data.third_name,
        role: data.role,
        phone: data.phone,
        dorm_id: data.dorm_id,
        tg: data.tg
      },
      ...prev
    ]);
    console.log(data);
    addPerson(data);
    resetData();
  };

  function resetData() {
    reset();
    setFirstName('');
    setSecondName('');
    setThirdName('');
    setPhone('');
    setPassword('');
    setTg('');
  }

  async function addPerson(data: person) {
    await axios
      .post('http://192.168.31.61:8000/user/register', JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.status === 401 || error.status === 403) {
          dispatch(notAuth());
        }
        console.log(error.message);
      });
  }

  return (
    <dialog ref={dialogRef} onClose={() => setIsOpen(false)} className='add-person'>
      <div className='add-person__blur'>
        <img src={ellipse} />
      </div>
      <div className='add-person__blur'>
        <img src={vector1} />
      </div>
      <div className='add-person__blur'>
        <img src={vector2} />
      </div>
      <div className='add-person__header'>
        <button
          type='button'
          style={{
            cursor: 'pointer',
            backgroundColor: 'transparent',
            border: 'none',
            position: 'relative',
            zIndex: '2'
          }}
          onClick={() => {
            setIsOpen(false);
            resetData();
          }}
        >
          <img src={arrowBack} className='add-person__header-back' />
        </button>
      </div>
      <form method='dialog' onSubmit={handleSubmit(onSubmit)} className='add-person__form'>
        <div className='add-person__content'>
          <input
            {...register('second_name', {
              required: true
            })}
            className='add-person__input'
            type='text'
            placeholder='Фамилия'
            onChange={(e) => setSecondName(e.currentTarget.value)}
            value={secondName}
          />
          <input
            {...register('first_name', {
              required: true
            })}
            className='add-person__input'
            type='text'
            placeholder='Имя'
            onChange={(e) => setFirstName(e.currentTarget.value)}
            value={firstName}
          />
          <input
            {...register('third_name', {
              required: true
            })}
            className='add-person__input'
            type='text'
            placeholder='Отчество'
            onChange={(e) => setThirdName(e.currentTarget.value)}
            value={thirdName}
          />
          <input
            {...register('phone', {
              required: true,
              pattern: {
                value: /^7\d{10}$/,
                message: ''
              }
            })}
            className='add-person__input'
            type='text'
            placeholder='Телефон (79876543210)'
            onChange={(e) => setPhone(e.currentTarget.value)}
            value={phone}
          />
          <input
            {...register('password', {
              required: true
            })}
            className='add-person__input'
            type='text'
            placeholder='Пароль'
            onChange={(e) => setPassword(e.currentTarget.value)}
            value={password}
          />
          <input
            {...register('tg', {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: ''
              },
              minLength: 5
            })}
            className='add-person__input'
            type='text'
            placeholder='Telegram'
            onChange={(e) => setTg(e.currentTarget.value)}
            value={tg}
          />
        </div>
        <div className='add-person__submit'>
          <button
            disabled={!isValid}
            className={!isValid ? 'add-person__submit-btn dialog__submit-btn--error' : 'add-person__submit-btn'}
            type='submit'
          >
            Внести
          </button>
        </div>
      </form>
    </dialog>
  );
};
