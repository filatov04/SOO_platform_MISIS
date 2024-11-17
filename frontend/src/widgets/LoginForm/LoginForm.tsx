import React from 'react';
import { useForm } from 'react-hook-form';
import vector2 from '../../shared/assets/LoginForm/Vector2.png';
import ellipse14 from '../../shared/assets/LoginForm/Ellipse14.png';
import vector1 from '../../shared/assets/LoginForm/Vector1.png';
import './LoginForm.scss';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (e: object) => {
    console.log(e);
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
        <input {...register('login')} type='text' placeholder='Логин' className='form__input-inp' />
      </div>
      <div className='form__input'>
        <input {...register('password')} type='password' placeholder='Пароль' className='form__input-inp' />
      </div>
      <div className='form__submit'>
        <input type='submit' value='Войти' className='form__submit-sub'></input>
      </div>
    </form>
  );
};
