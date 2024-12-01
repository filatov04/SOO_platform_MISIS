import { RefObject, useEffect } from 'react';
import arrowBack from '../../shared/assets/ModalCreateNotes/ArrowBack.png';
import './ModalCreateViolation.scss';
import { useForm } from 'react-hook-form';

interface ModalCreateViolationProps {
  modalRef: RefObject<HTMLDialogElement>;
  modalIsOpen: boolean;
  setModalIsOpen: () => void;
  room: string;
}

export const ModalCreateViolation = ({
  modalRef,
  modalIsOpen,
  setModalIsOpen,
  room
}: ModalCreateViolationProps): JSX.Element => {
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
    <dialog ref={modalRef} onClose={setModalIsOpen} className='modal-violation'>
      <form method='dialog' onSubmit={handleSubmit(onSubmit)} className='modal-violation__content'>
        <div className='modal-violation__heaeder'>
          <img src={arrowBack} />
        </div>
        <div></div>
        <div>
          <button type='submit'>Внести</button>
        </div>
      </form>
    </dialog>
  );
};
