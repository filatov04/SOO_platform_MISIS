import { RefObject, useEffect, useState } from 'react';
import arrowBack from '../../shared/assets/ModalCreateNotes/ArrowBack.png';
import { user } from '../../pages/AllUserPage';
import './ModalAddPerson.scss';
import { useForm } from 'react-hook-form';
import { useAppSelector } from '../../app/hooks/hooks';
import { userInfo } from '../../app/features/User/UserSlice';

interface ModalAddPersonProps {
  isOpen: boolean;
  dialogRef: RefObject<HTMLDialogElement>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUsers: React.Dispatch<React.SetStateAction<user[]>>;
}

export const ModalAddPerson = ({ isOpen, dialogRef, setIsOpen, setUsers }: ModalAddPersonProps) => {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [thirdName, setThirdName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [tg, setTg] = useState('');
  const user = useAppSelector(userInfo);

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
    formState: { errors, isValid }
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (e: any) => {
    const data: user = {
      first_name: e.first_name,
      second_name: e.second_name,
      third_name: e.third_name,
      phone: e.phone,
      tg: e.tg,
      role: 'operative',
      dorm_id: user.dormId
    };
    console.log(e);
    setUsers((prev) => [data, ...prev]);
    reset();
    setFirstName('');
    setSecondName('');
    setThirdName('');
    setPhone('');
    setPassword('');
    setTg('');
  };

  return (
    <dialog ref={dialogRef} onClose={() => setIsOpen(false)} className='add-person'>
      <div className='add-person__header'>
        <img src={arrowBack} className='add-person__header-back' onClick={() => setIsOpen(false)} />
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
          />
          <input
            {...register('first_name', {
              required: true
            })}
            className='add-person__input'
            type='text'
            placeholder='Имя'
            onChange={(e) => setFirstName(e.currentTarget.value)}
          />
          <input
            {...register('third_name', {
              required: true
            })}
            className='add-person__input'
            type='text'
            placeholder='Отчество'
            onChange={(e) => setThirdName(e.currentTarget.value)}
          />
          <input
            {...register('phone', {
              required: true
            })}
            className='add-person__input'
            type='text'
            placeholder='Телефон'
            onChange={(e) => setPhone(e.currentTarget.value)}
          />
          <input
            {...register('password', {
              required: true
            })}
            className='add-person__input'
            type='text'
            placeholder='Пароль'
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <input
            {...register('tg', {
              required: true
            })}
            className='add-person__input'
            type='text'
            placeholder='Telegram'
            onChange={(e) => e.currentTarget.value}
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
