import React from 'react';
import './FloorPage.scss';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import tg from '../../shared/assets/FloorPage/ContactInfo/Telegram.png';
import phone from '../../shared/assets/FloorPage/ContactInfo/phone.png';
import AddIcon from '@mui/icons-material/Add';
import vector1 from '../../shared/assets/FloorPage/Room/Vector1.png';
import vector2 from '../../shared/assets/FloorPage/Room/Vector2.png';

export const FloorPage = () => {
  return (
    <div className='floor-page'>
      <div className='floor-page__info'>
        <div className='floor-page__arrow-back'>
          <ArrowBackIosNewIcon sx={{ color: '#187FF6', width: '68px', height: '68px' }} />
        </div>
        <div className='floor-page__number'>2 этаж</div>
        <div className='floor-page__contact-info'>
          <div className='floor-page__contact-elder'>Староста</div>
          <div className='floor-page__contact-name'>Сайхаматов Акбар</div>
        </div>
        <div className='floor-page__contact-info'>
          <div className='floor-page__contact-elder'>
            <img src={tg} className='floor-page__tg' />
            @akbar
          </div>
          <div className='floor-page__contact-name'>
            <img src={phone} className='floor-page__phone' />
            +9919451059
          </div>
        </div>
      </div>
      <div className='floor-page__rooms'>
        <div className='floor-page__room room'>
          <div className='room__blur'>
            <img src={vector1} />
          </div>
          <div className='room__blur'>
            <img src={vector1} />
          </div>
          <div className='floor-page__room-header room__header'>
            <div className='floor-page__room-number room__number'>209</div>
            <div className='floor-page__room-add room__add'>
              <AddIcon sx={{ color: 'white', width: '50px', height: '50px', cursor: 'pointer' }} />
            </div>
          </div>
        </div>
        <div className='floor-page__room room'>
          <div className='room__blur'>
            <img src={vector1} />
          </div>
          <div className='room__blur'>
            <img src={vector1} />
          </div>
          <div className='floor-page__room-header room__header'>
            <div className='floor-page__room-number room__number'>209</div>
            <div className='floor-page__room-add room__add'>
              <AddIcon sx={{ color: 'white', width: '50px', height: '50px', cursor: 'pointer' }} />
            </div>
          </div>
        </div>
        <div className='floor-page__room room'>
          <div className='room__blur'>
            <img src={vector1} />
          </div>
          <div className='room__blur'>
            <img src={vector1} />
          </div>
          <div className='floor-page__room-header room__header'>
            <div className='floor-page__room-number room__number'>209</div>
            <div className='floor-page__room-add room__add'>
              <AddIcon sx={{ color: 'white', width: '50px', height: '50px', cursor: 'pointer' }} />
            </div>
          </div>
        </div>
        <div className='floor-page__room room'>
          <div className='room__blur'>
            <img src={vector1} />
          </div>
          <div className='room__blur'>
            <img src={vector1} />
          </div>
          <div className='floor-page__room-header room__header'>
            <div className='floor-page__room-number room__number'>209</div>
            <div className='floor-page__room-add room__add'>
              <AddIcon sx={{ color: 'white', width: '50px', height: '50px', cursor: 'pointer' }} />
            </div>
          </div>
        </div>
        <div className='floor-page__room room'>
          <div className='room__blur'>
            <img src={vector1} />
          </div>
          <div className='room__blur'>
            <img src={vector1} />
          </div>
          <div className='floor-page__room-header room__header'>
            <div className='floor-page__room-number room__number'>209</div>
            <div className='floor-page__room-add room__add'>
              <AddIcon sx={{ color: 'white', width: '50px', height: '50px', cursor: 'pointer' }} />
            </div>
          </div>
        </div>
        <div className='floor-page__room room'>
          <div className='room__blur'>
            <img src={vector1} />
          </div>
          <div className='room__blur'>
            <img src={vector1} />
          </div>
          <div className='floor-page__room-header room__header'>
            <div className='floor-page__room-number room__number'>209</div>
            <div className='floor-page__room-add room__add'>
              <AddIcon sx={{ color: 'white', width: '50px', height: '50px', cursor: 'pointer' }} />
            </div>
          </div>
        </div>
        <div className='floor-page__room room'>
          <div className='room__blur'>
            <img src={vector1} />
          </div>
          <div className='room__blur'>
            <img src={vector1} />
          </div>
          <div className='floor-page__room-header room__header'>
            <div className='floor-page__room-number room__number'>209</div>
            <div className='floor-page__room-add room__add'>
              <AddIcon sx={{ color: 'white', width: '50px', height: '50px', cursor: 'pointer' }} />
            </div>
          </div>
        </div>
        <div className='floor-page__room room'>
          <div className='room__blur'>
            <img src={vector1} />
          </div>
          <div className='room__blur'>
            <img src={vector1} />
          </div>
          <div className='floor-page__room-header room__header'>
            <div className='floor-page__room-number room__number'>209</div>
            <div className='floor-page__room-add room__add'>
              <AddIcon sx={{ color: 'white', width: '50px', height: '50px', cursor: 'pointer' }} />
            </div>
          </div>
        </div>
        <div className='floor-page__room room'>
          <div className='room__blur'>
            <img src={vector1} />
          </div>
          <div className='room__blur'>
            <img src={vector1} />
          </div>
          <div className='floor-page__room-header room__header'>
            <div className='floor-page__room-number room__number'>209</div>
            <div className='floor-page__room-add room__add'>
              <AddIcon sx={{ color: 'white', width: '50px', height: '50px', cursor: 'pointer' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
