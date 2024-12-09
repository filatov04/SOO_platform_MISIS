import './NotesItem.scss';

export interface NotesItemProps {
  roomNumber: string;
  text: string;
}

export const NotesItem = ({ roomNumber, text }: NotesItemProps): JSX.Element => {
  return (
    <div className='notes__item item'>
      <div className='notes__item-header item__header'>{roomNumber}</div>
      <div className='notes__item-text item__text'>{text}</div>
    </div>
  );
};
