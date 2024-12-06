import React from 'react';
import { useForm } from 'react-hook-form';
import vector2 from '../../shared/assets/LoginForm/Vector2.png';
import ellipse14 from '../../shared/assets/LoginForm/Ellipse14.png';
import vector1 from '../../shared/assets/LoginForm/Vector1.png';
import './LoginForm.scss';
import { useAppDispatch } from '../../app/hooks/hooks';
import { isAuth } from '../../app/features/Auth/AuthSlice';
import axios from 'axios';

interface formProps {
  phone: string;
  password: string;
}

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<formProps>({ mode: 'onBlur' });

  async function requests(data: formProps) {
    const post = await axios
      .post('http://localhost:8000/auth/login', JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => {
        if (response.data.message !== 'User not found') {
          dispatch(isAuth());
        }
      })
      .catch((error) => {
        console.error('Ошибка', error.message);
      });
  }

  const onSubmit = (e: formProps) => {
    requests(e);
  };

  return (
    <form className='login__form form' onSubmit={handleSubmit(onSubmit)}>
      <div className='login__blur1'>
        <img src={vector2} />
      </div>
      <div className='login__blur2'>
        <img src={ellipse14} />
      </div>
      <div className='login__blur3'>
        <img src={vector1} />
      </div>
      <div className='form__input'>
        <input {...register('phone')} type='text' placeholder='Телефон' className='form__input-inp' />
      </div>
      <div className='form__input'>
        <input {...register('password')} type='password' placeholder='Пароль' className='form__input-inp' />
      </div>
      <div className='form__submit'>
        <input /*onClick={() => dispatch(isAuth())}*/ type='submit' value='Войти' className='form__submit-sub'></input>
      </div>
    </form>
  );
};
