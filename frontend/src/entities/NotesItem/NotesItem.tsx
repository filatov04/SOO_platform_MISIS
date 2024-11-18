import React from 'react';
import './NotesItem.scss';

export const NotesItem = () => {
  return (
    <div className='notes__item item'>
      <div className='notes__item-header item__header'>609-2</div>
      <div className='notes__item-text item__text'>
        Заходить каждый день в течении недели, есть подозрение что курят в комнате
      </div>
    </div>
  );
};
