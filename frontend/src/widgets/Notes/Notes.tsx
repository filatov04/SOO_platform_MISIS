import React from 'react';
import './Notes.scss';
import AddIcon from '@mui/icons-material/Add';
import vector1 from '../../shared/assets/Notes/Vector1.png';
import vector2 from '../../shared/assets/Notes/Vector2.png';
import { NotesItem } from '../../entities';

export const Notes = () => {
  return (
    <div className='content__notes notes'>
      <div className='notes__blur'>
        <img src={vector1} />
      </div>
      <div className='notes__blur'>
        <img src={vector2} />
      </div>
      <div className='notes__header'>
        <div className='notes__header-block'>
          <p className='notes__header-name'>Примечания</p>
        </div>
        <div className='notes__header-add'>
          <AddIcon sx={{ color: 'white', width: '40px', height: '40px', cursor: 'pointer' }} />
        </div>
      </div>
      <div className='notes__block-list'>
        <div className='notes__list'>
          <NotesItem />
          <NotesItem />
          <NotesItem />
          <NotesItem />
          <NotesItem />
          <NotesItem />
        </div>
      </div>
    </div>
  );
};
