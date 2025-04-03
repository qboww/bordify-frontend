import {
  StartImgMob1x,
  StartImgMob2x,
  StartImgTab1x,
  StartImgTab2x,
  StartImgDesk1x,
  StartImgDesk2x,
} from '../../assets/images/start';
import { Button } from '../Button/Button';
import Logo from '../Logo/Logo';
import Lightning from './Lightning';
import css from './Welcome.module.css';
import { NavLink } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className={css.background}>
      <picture>
        <source
          media="(max-width: 375px)"
          srcSet={`${StartImgMob1x} 1x, ${StartImgMob2x} 2x`}
        />

        <source
          media="(min-width: 768px)"
          srcSet={`${StartImgTab1x} 1x, ${StartImgTab2x} 2x`}
        />

        <source
          media="(min-width: 1440px)"
          srcSet={`${StartImgDesk1x} 1x, ${StartImgDesk2x} 2x`}
        />

        <img
          src={StartImgMob1x}
          srcSet={`${StartImgMob1x} 1x, ${StartImgMob2x} 2x`}
          alt="User with laptop"
        />
      </picture>

      <Logo big />
      {/* <div className={css.logo}>
        <span>
          <Lightning width={15} height={20} fillColor={'#fff'} />
        </span>
        <h1>Task Pro</h1>
      </div> */}

      <p className={css.info}>
        Supercharge your productivity and take control of your tasks with Task
        Pro - Don't wait, start achieving your goals now!
      </p>

      <div className={css.authNav}>
        <NavLink to="/auth/register">
          <Button typeStyle="transparent" buttonText="Registration" />
        </NavLink>
        <NavLink to="/auth/login">
          <Button typeStyle="transparent" buttonText="Log In" />
        </NavLink>
      </div>
    </div>
  );
};

export default Welcome;
