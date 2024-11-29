import React, { RefObject, useEffect } from 'react';
import './ModalCreateNotes.scss';
import arrowBack from '../../shared/assets/ModalCreateNotes/ArrowBack.png';
import { useForm } from 'react-hook-form';

interface ModalCreateNotes {
  isOpen: boolean;
  dialogRef: RefObject<HTMLDialogElement>;
  setIsOpen: () => void;
}

export const ModalCreateNotes = ({ dialogRef, isOpen, setIsOpen }: ModalCreateNotes): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({ mode: 'onBlur' });

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} onClose={setIsOpen} id='modalNotes' className='dialog' aria-label='Modal for create notes'>
      <form method='dialog'>
        <div className='dialog__content'>
          <div className='dialog__header'>
            <div className='dialog__header-arrow'>
              <img src={arrowBack} onClick={setIsOpen} />
            </div>
            <div className='dialog__header-room'>
              <input
                {...register('room', {
                  required: true
                })}
                className='dialog__room-inp'
                type='text'
                placeholder='Комната'
              />
            </div>
          </div>
          <div className='dialog__note'>
            <textarea
              {...register('room', {
                required: true
              })}
              className='dialog__note-inp'
              placeholder='Информация...'
            />
          </div>
          <div className='dialog__submit'>
            <button disabled={isValid} type='submit' className='dialog__submit-btn'>
              Внести
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
};
