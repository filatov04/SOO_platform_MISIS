import React from 'react';
import './Notes.scss';
import AddIcon from '@mui/icons-material/Add';
import vector1 from '../../shared/assets/Notes/Vector1.png';
import vector2 from '../../shared/assets/Notes/Vector2.png';
import { NotesItem, NotesItemProps } from '../../entities';

interface NotesProps {
  notes?: NotesItemProps[];
}

export const Notes = ({ notes = [] }: NotesProps): JSX.Element => {
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
          {notes.length !== 0 ? (
            notes.map((item, index) => <NotesItem key={index} roomNumber={item.roomNumber} text={item.text} />)
          ) : (
            <NotesItem roomNumber='609-2' text='Заходить в комнату почаще так как есть подозрение на курение' />
          )}
        </div>
      </div>
    </div>
  );
};
