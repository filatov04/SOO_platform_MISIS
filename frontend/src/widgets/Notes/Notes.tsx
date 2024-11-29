import React, { useRef, useState } from 'react';
import './Notes.scss';
import AddIcon from '@mui/icons-material/Add';
import vector1 from '../../shared/assets/Notes/Vector1.png';
import vector2 from '../../shared/assets/Notes/Vector2.png';
import { NotesItem, NotesItemProps } from '../../entities';
import { ModalCreateNotes } from '../../features';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import '../../features/ModalCreateNotes/ModalCreateNotes.scss';

interface NotesProps {
  notes?: NotesItemProps[];
}

export const Notes = ({ notes = [] }: NotesProps): JSX.Element => {
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
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
            <button type='button' style={{ background: 'none', border: 'none' }} onClick={() => setIsOpen(true)}>
              <AddIcon sx={{ color: 'white', width: '40px', height: '40px', cursor: 'pointer' }} />
            </button>
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
      <ModalCreateNotes isOpen={isOpen} setIsOpen={() => setIsOpen(false)} dialogRef={dialogRef} />
    </>
  );
};
