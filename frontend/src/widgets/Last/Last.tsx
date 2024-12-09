import './Last.scss';
import vector5 from '../../shared/assets/UniversalBlock/Vector3.png';
import vector6 from '../../shared/assets/UniversalBlock/Vector4.png';
import ellipse from '../../shared/assets/UniversalBlock/Ellipse1.png';

export const Last = () => {
  return (
    <div className='content__universal-block content__universal-block--big universal-block'>
      <div className='universal-block__blur'>
        <img src={vector5} />
      </div>
      <div className='universal-block__blur'>
        <img src={vector6} />
      </div>
      <div className='universal-block__blur'>
        <img src={ellipse} />
      </div>
      <div className='universal-block__header universal-block__header--small'>
        <div className='universal-block__header-cont'>
          <p className='universal-block__header-name'>Последнее</p>
        </div>
      </div>
      <div className='universal-block__cont'>
        <div className='universal-block__last last'>
          <div className='universal-block__last-act last__act last__act--red'>
            <p>АКТ</p>
          </div>
          <div className='universal-block__last-room last__room'>
            <p>212-2</p>
          </div>
          <div className='universal-block__last-people last__people'>
            <div>
              <p className='universal-block__last-fullname last__fullname'>Илья Филатов</p>
            </div>
            <div>
              <p className='universal-block__last-violation last__violation'>
                Распитие спиртных напитков на территории общежития
              </p>
            </div>
          </div>
        </div>
        <div className='universal-block__last last'>
          <div className='universal-block__last-act last__act last__act--yellow'>
            <p>ЗМ</p>
          </div>
          <div className='universal-block__last-room last__room'>
            <p>1609-3</p>
          </div>
          <div className='universal-block__last-people last__people'>
            <div>
              <p className='universal-block__last-fullname last__fullname'>Илья Иванов</p>
            </div>
            <div>
              <p className='universal-block__last-violation last__violation'>Антисанитария в блоке</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
