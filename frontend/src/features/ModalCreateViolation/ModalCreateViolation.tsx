import React, { RefObject, SetStateAction, useEffect, useState } from 'react';
import arrowBack from '../../shared/assets/ModalCreateNotes/ArrowBack.png';
import './ModalCreateViolation.scss';
import { useForm } from 'react-hook-form';
import { FormSelect } from '../../shared/FormSelect';

interface ModalCreateViolationProps {
  modalRef: RefObject<HTMLDialogElement>;
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<SetStateAction<boolean>>;
  room: string;
}

export const ModalCreateViolation = ({
  modalRef,
  modalIsOpen,
  setModalIsOpen,
  room
}: ModalCreateViolationProps): JSX.Element => {
  const [roomNumber, setRoomNumber] = useState('');
  const [violation, setViolation] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (e: any) => {};

  useEffect(() => {
    if (modalIsOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [modalIsOpen]);

  return (
    <dialog ref={modalRef} onClose={() => setModalIsOpen(false)} className='modal-violation'>
      <form method='dialog' onSubmit={handleSubmit(onSubmit)} className='modal-violation__content'>
        <div className='modal-violation__header'>
          <img src={arrowBack} onClick={() => setModalIsOpen(false)} />
        </div>
        <div>
          <div>
            <FormSelect
              register={{
                ...register('roomNumber', {
                  required: true
                })
              }}
              options={[
                { id: 1, value: '2', name: `${room}-2` },
                { id: 2, value: '3', name: `${room}-3` }
              ]}
              onChange={(e) => setRoomNumber(e)}
              value={roomNumber}
            />
          </div>
          <div>
            <FormSelect
              register={{
                ...register('punishment', {
                  required: true
                })
              }}
              options={[
                { id: 1, value: 'warning', name: 'ЗМ' },
                { id: 2, value: 'act', name: 'АКТ' }
              ]}
              onChange={(e) => setViolation(e)}
              value={violation}
            />
          </div>
        </div>
        <div>
          <button type='submit'>Внести</button>
        </div>
      </form>
    </dialog>
  );
};
