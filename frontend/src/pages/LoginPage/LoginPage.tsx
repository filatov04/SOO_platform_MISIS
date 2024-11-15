import React from 'react';
import './LoginPage.scss';
import { useForm } from 'react-hook-form';

export const LoginPage = () => {
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
    <div className='login'>
      <form className='login__form form' onSubmit={handleSubmit(onSubmit)}>
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
    </div>
  );
};
