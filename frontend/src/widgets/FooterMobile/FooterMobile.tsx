import './FooterMobile.scss';
import HomeIcon from '@mui/icons-material/Home';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks';
import { footerOptions, setOption } from '../../app/features/Footer/FooterSlice';

export const FooterMobile = () => {
  const dispatch = useAppDispatch();
  const footer = useAppSelector(footerOptions);
  return (
    <div className='footer'>
      <div className='footer__content'>
        <div className='footer__icon'>
          <HomeIcon
            onClick={() => dispatch(setOption({ option: 1 }))}
            sx={
              footer === 1
                ? { width: '50px', height: '65px', color: 'white', cursor: 'pointer' }
                : { width: '50px', height: '65px', color: 'white', opacity: '0.7', cursor: 'pointer' }
            }
          />
        </div>
        <div className='footer__icon'>
          <ViewAgendaIcon
            onClick={() => dispatch(setOption({ option: 2 }))}
            sx={
              footer === 2
                ? { width: '50px', height: '65px', color: 'white', cursor: 'pointer' }
                : { width: '50px', height: '65px', color: 'white', opacity: '0.7', cursor: 'pointer' }
            }
          />
        </div>
      </div>
    </div>
  );
};
