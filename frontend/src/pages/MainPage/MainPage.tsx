import React, { useEffect, useState } from 'react';
import './MainPage.scss';
import { Employee, Floor, floorProps, Last, Notes } from '../../widgets';
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks';
import { saveInfo, userInfo, UserState } from '../../app/features/User/UserSlice';
import axios from 'axios';
import { NotesItemProps } from '../../entities';

export const MainPage = () => {
  const user = useAppSelector(userInfo);
  const dispatch = useAppDispatch();
  const [notes, setNotes] = useState<NotesItemProps[]>([]);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadingNotes, setIsLoadindNotes] = useState(false);
  const [isLoadingFloors, setIsLoadingFloors] = useState(false);
  const [floors, setFloors] = useState<floorProps[]>([]);
  useEffect(() => {
    async function getInfo() {
      const getUserInfo = await axios
        .get('http://localhost:8000/user/info', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        })
        .then((response) => {
          const data: UserState = {
            firstName: response.data.first_name,
            secondName: response.data.second_name,
            thirdName: response.data.third_name,
            role: response.data.role,
            dormId: response.data.dorm_id
          };
          dispatch(saveInfo(data));
          setIsLoadingUser(true);
          console.log(data);
        })
        .catch((error) => {
          if (error.response) {
            console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
          } else {
            console.error('Error:', error.message);
          }
        });
    }

    async function getNotes() {
      const getNotesInfo = await axios
        .get('http://localhost:8000/notes/get/' + user.dormId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        })
        .then((response) => {
          setNotes(response.data);
          setIsLoadindNotes(true);
        })
        .catch((error) => {
          if (error.response) {
            console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
          } else {
            console.error('Error:', error.message);
          }
        });
    }

    async function getFloor() {
      const getFloorInfo = await axios
        .get('http://localhost:8000/floors/get/' + user.dormId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        })
        .then((response) => {
          const length = response.data.length;
          const array = Array.from({ length }, (_, i) => ({ floor: i + 1 }));
          setFloors(array);
          setIsLoadingFloors(true);
        })
        .catch((error) => {
          if (error.response) {
            console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
          } else {
            console.error('Error:', error.message);
          }
        });
    }

    getInfo();
    getNotes();
    getFloor();
  }, []);

  if (isLoadingFloors && isLoadingNotes && isLoadingUser) {
    return (
      <div className='content'>
        <Notes notes={notes} />
        <div className='content__main'>
          <Employee />
          <Last />
        </div>
        <Floor floors={floors} />
      </div>
    );
  } else {
    return <div>Загрузка...</div>;
  }
};
