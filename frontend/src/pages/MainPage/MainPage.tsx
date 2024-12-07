import React, { useEffect, useState } from 'react';
import './MainPage.scss';
import { Employee, Floor, Last, Notes } from '../../widgets';
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks';
import { saveInfo, userInfo, UserState } from '../../app/features/User/UserSlice';
import axios from 'axios';
import { NotesItemProps } from '../../entities';
import { HeadmanDictionary, saveHeadmans } from '../../app/features/Headmans/HeadmansSlice';

export interface FloorHeadman {
  floor: string;
  floor_id: string;
}

export const MainPage = () => {
  const user = useAppSelector(userInfo);
  const dispatch = useAppDispatch();
  const [notes, setNotes] = useState<NotesItemProps[]>([]);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadingNotes, setIsLoadindNotes] = useState(false);
  const [isLoadingFloors, setIsLoadingFloors] = useState(false);
  const [floors, setFloors] = useState<FloorHeadman[]>([]);

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
  }, []);

  useEffect(() => {
    async function getNotes() {
      const getNotesInfo = await axios
        .get('http://localhost:8000/notes/get/' + user.dormId, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        })
        .then((response) => {
          const length = response.data.length;
          const array = Array.from({ length }, (_, i) => ({
            roomNumber: response.data[i].room,
            text: response.data[i].description
          }));
          setNotes(array);
          setIsLoadindNotes(true);
          //console.log(response.data);
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
          const array = Array.from({ length }, (_, i) => ({
            floor: response.data[i].floor_number,
            floor_id: response.data[i].floor_id
          }));
          let arrayHeadmans: HeadmanDictionary = {};
          for (let i = 0; i < length; i++) {
            arrayHeadmans[response.data[i].floor_id] = {
              firstName: response.data[i].owner_first_name,
              secondName: response.data[i].owner_second_name,
              thirdName: response.data[i].owner_third_name,
              tg: response.data[i].owner_tg,
              phone: response.data[i].owner_phone
            };
          }
          // console.log(arrayHeadmans);
          // //console.log(response.data);
          console.log(array);
          setFloors(array);
          dispatch(saveHeadmans(arrayHeadmans));
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

    getNotes();
    getFloor();
  }, [user.dormId]);

  if (isLoadingFloors && isLoadingNotes && isLoadingUser) {
    return (
      <div className='content'>
        <Notes setNotes={setNotes} notes={notes} />
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
