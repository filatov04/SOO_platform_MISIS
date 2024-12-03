import React, { RefObject, SetStateAction, useEffect, useState } from 'react';
import arrowBack from '../../shared/assets/ModalCreateNotes/ArrowBack.png';
import './ModalCreateViolation.scss';
import { useForm } from 'react-hook-form';
import { FormSelect } from '../../shared';
import { document_type, violation_type } from '../RoomFloor';
import { blockNumberRoomNumber, blockViolation, violation } from '../../pages';
import axios from 'axios';

interface ModalCreateViolationProps {
  modalRef: RefObject<HTMLDialogElement>;
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<SetStateAction<boolean>>;
  roomsID: blockNumberRoomNumber;
  room: string;
  setRoomsWithViolations: React.Dispatch<SetStateAction<blockViolation>>;
  //roomsWithViolation: blockViolation;
}

interface formData {
  room_id: string;
  document_type: string;
  created_at: string;
  violation_type: string;
  violator_name: string;
  witness: string;
  description: string;
}

export const ModalCreateViolation = ({
  modalRef,
  modalIsOpen,
  setModalIsOpen,
  roomsID,
  room,
  setRoomsWithViolations
  //roomsWithViolation
}: ModalCreateViolationProps): JSX.Element => {
  const [roomNumber, setRoomNumber] = useState<string>('');
  const [violation, setViolation] = useState<string>('');
  const [violationType, setViolationType] = useState<string>('');
  const [violator, setViolator] = useState<string>('');
  const [witness, setWitness] = useState<string>('');
  const [date, setDate] = useState<string>('');

  async function sendViolation(data: any) {
    const post = await axios
      .post('http://localhost:8000/violations/add', JSON.stringify(data), {
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (e: any) => {
    const data = {
      room_id: Number(e.room_id),
      document_type: e.document_type,
      created_at: `${e.created_at} 00:00:00`,
      violation_type: e.violation_type,
      violator_name: e.violator_name,
      witness: e.witness,
      description: e.description
    };
    console.log(data);
    sendViolation(data);
    //const reverseDict = Object.fromEntries(Object.entries(roomsID).map(([key, value]) => [value, key]));
    const dataLocal = {
      document_type: e.document_type,
      violation_type: e.violation_type,
      violator_name: e.violator_name,
      witness: e.witness,
      description: e.description,
      room_id: Number(e.room_id),
      room_number: isNaN(Number(findKeyByValue(roomsID, Number(e.room_id))))
        ? null
        : Number(findKeyByValue(roomsID, Number(e.room_id))),
      created_at: e.created_at
    };
    //console.log(dataLocal);
    addViolation(Number(room), dataLocal);
    resetData();
  };

  const addViolation = (blockNumber: number, violation: violation) => {
    setRoomsWithViolations((prevData) => {
      const updatedData = { ...prevData };

      // Проверяем, существует ли массив для ключа
      if (!updatedData[blockNumber]) {
        updatedData[blockNumber] = [];
      }

      // Добавляем объект в массив
      updatedData[blockNumber].push(violation);

      return updatedData;
    });
  };

  function findKeyByValue(dict: blockNumberRoomNumber, targetValue: number): string | undefined {
    for (const [outerKey, innerDict] of Object.entries(dict)) {
      for (const [innerKey, value] of Object.entries(innerDict)) {
        //console.log(value);
        if (value === targetValue) {
          return `${innerKey}`; // Возвращаем путь: внешний и внутренний ключ
        }
      }
    }
    return undefined; // Если значение не найдено
  }

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
                ...register('room_id', {
                  required: true
                })
              }}
              options={
                roomsID?.[Number(room)] && Object.entries(roomsID?.[Number(room)]).length !== 1
                  ? [
                      { id: 1, value: `${roomsID?.[Number(room)]?.[2]}`, name: `${room}-2` },
                      { id: 2, value: `${roomsID?.[Number(room)]?.[3]}`, name: `${room}-3` }
                    ]
                  : [{ id: 1, value: `${roomsID?.[Number(room)]?.['null']}`, name: `${room}` }]
              }
              onChange={(e) => setRoomNumber(e)}
              value={roomNumber}
            />
          </div>
          <div className='modal-violation__act'>
            <FormSelect
              defaultValue='AКТ/ЗМ'
              register={{
                ...register('document_type', {
                  required: true
                })
              }}
              options={[
                { id: 1, value: 'warning', name: document_type.warning },
                { id: 2, value: 'act', name: document_type.act }
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
            {...register('created_at', {
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
              ...register('violation_type', {
                required: true
              })
            }}
            options={[
              { id: 1, value: 'unsanitation_block', name: violation_type.unsanitation_block },
              {
                id: 2,
                value: 'unsanitation_room',
                name: violation_type.unsanitation_room
              },
              {
                id: 3,
                value: 'unsanitation_general_place',
                name: violation_type.unsanitation_general_place
              },
              { id: 4, value: 'drink_alcohol', name: violation_type.drink_alcohol },
              {
                id: 5,
                value: 'passage_alcohol',
                name: violation_type.passage_alcohol
              },
              {
                id: 6,
                value: 'keeping_alcohol',
                name: violation_type.keeping_alcohol
              },
              {
                id: 7,
                value: 'fire_security',
                name: violation_type.fire_security
              },
              { id: 8, value: 'electrical_security', name: violation_type.electrical_security },
              { id: 9, value: 'noise_mode', name: violation_type.noise_mode },
              {
                id: 10,
                value: 'guest_mode',
                name: violation_type.guest_mode
              },
              { id: 11, value: 'break_mode', name: violation_type.break_mode },
              {
                id: 12,
                value: 'block_thing',
                name: violation_type.block_thing
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
