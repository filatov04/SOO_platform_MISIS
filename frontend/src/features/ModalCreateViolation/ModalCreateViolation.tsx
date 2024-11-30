import React, { RefObject, SetStateAction, useEffect, useState } from 'react';
import arrowBack from '../../shared/assets/ModalCreateNotes/ArrowBack.png';
import './ModalCreateViolation.scss';
import { useForm } from 'react-hook-form';
import { FormSelect } from '../../shared/FormSelect';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
  const [roomNumber, setRoomNumber] = useState<string>('');
  const [violation, setViolation] = useState<string>('');
  const [violationType, setViolationType] = useState<string>('');
  const [violator, setViolator] = useState<string>('');
  const [witness, setWitness] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (e: any) => {
    console.log(e);
    resetData();
  };

  function resetData() {
    reset();
    setDate('');
    setViolator('');
    setWitness('');
    setViolation('');
    setRoomNumber('');
    setViolationType('');
  }

  useEffect(() => {
    if (modalIsOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }

    resetData();
  }, [modalIsOpen]);

  return (
    <dialog ref={modalRef} onClose={() => setModalIsOpen(false)} className='modal-violation'>
      <form method='dialog' onSubmit={handleSubmit(onSubmit)} className='modal-violation__content'>
        <div className='modal-violation__header'>
          <img style={{ cursor: 'pointer' }} src={arrowBack} onClick={() => setModalIsOpen(false)} />
        </div>
        <div className='modal-violation__room-act'>
          <div className='modal-violation__room'>
            <FormSelect
              defaultValue='Комната'
              register={{
                ...register('roomNumber', {
                  required: true
                })
              }}
              options={[
                { id: 1, value: `${room}-2`, name: `${room}-2` },
                { id: 2, value: `${room}-3`, name: `${room}-3` }
              ]}
              onChange={(e) => setRoomNumber(e)}
              value={roomNumber}
            />
          </div>
          <div className='modal-violation__act'>
            <FormSelect
              defaultValue='AКТ/ЗМ'
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
        <div className='modal-violation__general'>
          <input
            className='modal-violation__inp'
            type='date'
            {...register('date', {
              required: true
            })}
            onChange={(e) => setDate(e.currentTarget.value)}
            value={date}
          />
        </div>
        {/*Вид нарушения*/}
        <div className='modal-violation__general'>
          <FormSelect
            defaultValue='Вид нарушения'
            register={{
              ...register('violationtype', {
                required: true
              })
            }}
            options={[
              { id: 1, value: 'unsanitation', name: 'Антисанитария в блоке (туалет, ванная)' },
              {
                id: 2,
                value: 'unsanitation',
                name: 'Антисанитария в комнате (грязная посуда, разрбросанные вещи, грязный пол)'
              },
              {
                id: 3,
                value: 'unsanitation',
                name: 'Антисанитария в общественном месте (кухня, мусоропровод)'
              },
              { id: 4, value: 'alcohol_mode', name: 'Распитие спиртных напитков на территории общежития' },
              {
                id: 5,
                value: 'alcohol_mode',
                name: 'Проход в общежитие в состоянии алкогольного (наркотического опьянения)'
              },
              {
                id: 6,
                value: 'alcohol_mode',
                name: 'Пронос, хранение, распространение спиртных напитков на территории общежития'
              },
              {
                id: 7,
                value: 'fire_security',
                name: 'Нарушение пожарной безопасности - курение в помещениях общежития сигарет, электронных сигарет, средств нагревания табака'
              },
              {
                id: 8,
                value: 'fire_security',
                name: 'Нарушение пожарной безопасности - срабатывание АПС, приготовление пищи, вызвавшее задымление помещений  общего пользования'
              },
              { id: 9, value: 'electrical_security', name: 'Нарушение правил электробезопасности' },
              { id: 10, value: 'noise_mode', name: 'Нарушение шумового режима с 22:00 до 07:00' },
              {
                id: 11,
                value: 'guest_mode',
                name: 'Нарушение гостевого режима (выход гостей после 23:00, незаконное проведение посторонних лиц)'
              },
              { id: 12, value: 'break_mode', name: 'Порча имущества общежития' },
              {
                id: 13,
                value: 'block_thing',
                name: 'Хранение лищних вещей, загромождающие комнаты и проходы в коридорах'
              }
            ]}
            onChange={(e) => setViolationType(e)}
            value={violationType}
          />
        </div>
        {violationType !== '' ? (
          <div className='modal-violation__general'>
            <input
              className='modal-violation__inp'
              {...register('description', {
                required: true
              })}
              type='text'
              placeholder='Уточнение'
            />
          </div>
        ) : (
          <></>
        )}
        <div className='modal-violation__general'>
          <input
            className='modal-violation__inp'
            {...register('violator_name', {
              required: true
            })}
            value={violator}
            type='text'
            placeholder='Нарушитель'
            onChange={(e) => setViolator(e.currentTarget.value)}
          />
        </div>
        <div className='modal-violation__general'>
          <input
            className='modal-violation__inp'
            {...register('witness', {
              required: true
            })}
            type='text'
            value={witness}
            placeholder='Свидетель'
            onChange={(e) => setWitness(e.currentTarget.value)}
          />
        </div>
        <div className='modal-violation__submit'>
          <button
            className={!isValid ? 'modal-violation__btn modal-violation__btn--error' : 'modal-violation__btn'}
            disabled={!isValid}
            type='submit'
          >
            Внести
          </button>
        </div>
      </form>
    </dialog>
  );
};
