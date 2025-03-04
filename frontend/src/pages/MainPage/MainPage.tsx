import { useEffect, useState } from 'react';
import './MainPage.scss';
import { Employee, Floor, Last, Notes } from '../../widgets';
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks';
import { saveInfo, userInfo, UserState } from '../../app/features/User/UserSlice';
import axios from 'axios';
import { NotesItemProps } from '../../entities';
import { HeadmanDictionary, saveHeadmans } from '../../app/features/Headmans/HeadmansSlice';
import { notAuth } from '../../app/features/Auth/AuthSlice';
import { Spinner } from '../../shared';
import { useMediaQuery } from '@mui/material';
import { footerOptions } from '../../app/features/Footer/FooterSlice';

export interface FloorHeadman {
  floor: string;
  floor_id: string;
}

export const MainPage = () => {
  const user = useAppSelector(userInfo);
  const dispatch = useAppDispatch();
  const footer = useAppSelector(footerOptions);
  const [notes, setNotes] = useState<NotesItemProps[]>([]);
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isLoadingNotes, setIsLoadindNotes] = useState(false);
  const [isLoadingFloors, setIsLoadingFloors] = useState(false);
  const [floors, setFloors] = useState<FloorHeadman[]>([]);
  const isMobile = useMediaQuery(`(max-width:768px)`);

  useEffect(() => {
    async function getInfo() {
      await axios
        .get('http://192.168.31.61:8000/user/info', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        })
        .then((response) => {
          //console.log(response.status);
          const data: UserState = {
            firstName: response.data.first_name,
            secondName: response.data.second_name,
            thirdName: response.data.third_name,
            role: response.data.role,
            dormId: response.data.dorm_id
          };
          dispatch(saveInfo(data));
          setIsLoadingUser(true);
          //dispatch(isAuth());
        })
        .catch((error) => {
          if (error.status === 401 || error.status === 403) {
            dispatch(notAuth());
          }
        });
    }
    getInfo();
  }, []);

  useEffect(() => {
    async function getNotes() {
      await axios
        .get('http://192.168.31.61:8000/notes/get/' + user.dormId, {
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
      await axios
        .get('http://192.168.31.61:8000/floors/get/' + user.dormId, {
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
          //console.log(array);
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
        {isMobile ? (
          footer === 1 ? (
            <div className='content__main'>
              <Employee />
              <Last />
            </div>
          ) : (
            <>
              <Notes setNotes={setNotes} notes={notes} />
              <Floor floors={floors} />
            </>
          )
        ) : (
          <>
            <Notes setNotes={setNotes} notes={notes} />
            <div className='content__main'>
              <Employee />
              <Last />
            </div>
            <Floor floors={floors} />
          </>
        )}
      </div>
    );
  } else {
    return <Spinner />;
  }
};
