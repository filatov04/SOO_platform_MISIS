import React, { RefObject, useEffect } from 'react';
import './ModalCreateNotes.scss';
import arrowBack from '../../shared/assets/ModalCreateNotes/ArrowBack.png';
import { useForm } from 'react-hook-form';
import { NotesItemProps } from '../../entities';
import { useAppSelector } from '../../app/hooks/hooks';
import { userInfo } from '../../app/features/User/UserSlice';
import axios from 'axios';

interface ModalCreateNotesProps {
  isOpen: boolean;
  dialogRef: RefObject<HTMLDialogElement>;
  setIsOpen: () => void;
  setNotes: React.Dispatch<React.SetStateAction<NotesItemProps[]>>;
}

interface FormNote {
  room_id: number;
  room: string;
  description: string;
}

export const ModalCreateNotes = ({ setNotes, dialogRef, isOpen, setIsOpen }: ModalCreateNotesProps): JSX.Element => {
  const room_id = useAppSelector(userInfo);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<FormNote>({ mode: 'onBlur' });

  async function addNotes(e: { dorm_id: number; room: string; description: string }) {
    const post = await axios
      .post('http://localhost:8000/notes/add', JSON.stringify(e), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const onSubmit = (e: FormNote) => {
    const data = {
      dorm_id: room_id.dormId,
      room: e.room,
      description: e.description
    };
    console.log(data);
    addNotes(data);
    reset();
    setNotes((prev: NotesItemProps[]) => [{ roomNumber: e.room, text: e.description }, ...prev]);
  };

  return (
    <dialog ref={dialogRef} onClose={setIsOpen} id='modalNotes' className='dialog' aria-label='Modal for create notes'>
      <form method='dialog' onSubmit={handleSubmit(onSubmit)}>
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
              {...register('description', {
                required: true
              })}
              className='dialog__note-inp'
              placeholder='Информация...'
            />
          </div>
          <div className='dialog__submit'>
            <button
              disabled={!isValid}
              type='submit'
              className={!isValid ? 'dialog__submit-btn dialog__submit-btn--error' : 'dialog__submit-btn'}
            >
              Внести
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
};
