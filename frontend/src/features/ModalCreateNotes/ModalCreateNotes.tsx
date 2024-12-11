import React, { RefObject, useEffect, useState } from 'react';
import './ModalCreateNotes.scss';
import arrowBack from '../../shared/assets/ModalCreateNotes/ArrowBack.png';
import { useForm } from 'react-hook-form';
import { NotesItemProps } from '../../entities';
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks';
import { userInfo } from '../../app/features/User/UserSlice';
import axios from 'axios';
import ellipse from '../../shared/assets/Modal/Ellipse.png';
import vector1 from '../../shared/assets/Modal/Vector1.png';
import vector2 from '../../shared/assets/Modal/Vector2.png';
import { notAuth } from '../../app/features/Auth/AuthSlice';

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
  const dispatch = useAppDispatch();
  const [room, setRoom] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm<FormNote>({ mode: 'onChange' });

  async function addNotes(e: { dorm_id: number; room: string; description: string }) {
    await axios
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
        if (error.status === 401 || error.status === 403) {
          dispatch(notAuth());
        }
      });
  }

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
      resetData();
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
    resetData();
    setNotes((prev: NotesItemProps[]) => [{ roomNumber: e.room, text: e.description }, ...prev]);
  };

  function resetData() {
    reset();
    setNote('');
    setRoom('');
  }

  return (
    <dialog ref={dialogRef} onClose={setIsOpen} id='modalNotes' className='dialog' aria-label='Modal for create notes'>
      <div className='dialog__blur'>
        <img src={ellipse} />
      </div>
      <div className='dialog__blur'>
        <img src={vector1} />
      </div>
      <div className='dialog__blur'>
        <img src={vector2} />
      </div>
      <form method='dialog' className='dialog__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='dialog__content'>
          <div className='dialog__header'>
            <div className='dialog__header-arrow'>
              <button
                type='button'
                onClick={setIsOpen}
                style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                <img src={arrowBack} />
              </button>
            </div>
            <div className='dialog__header-room'>
              <input
                {...register('room', {
                  required: true,
                  pattern: {
                    value: /^\d{3,4}(-[23])?$/,
                    message: ''
                  }
                })}
                className='dialog__room-inp'
                type='text'
                placeholder='Комната'
                onChange={(e) => setRoom(e.currentTarget.value)}
                value={room}
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
              onChange={(e) => setNote(e.currentTarget.value)}
              value={note}
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
