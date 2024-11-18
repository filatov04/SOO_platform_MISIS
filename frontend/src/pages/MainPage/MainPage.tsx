import React, { useEffect, useState } from 'react';
import './MainPage.scss';
import { Employee, Floor, Last, Notes } from '../../widgets';

export const MainPage = () => {
  return (
    <div className='content'>
      <Notes />
      <div className='content__main'>
        <Employee />
        <Last />
      </div>
      <Floor />
    </div>
  );
};
