import { Button } from '../Button/Button';
import Logo from '../Logo/Logo';
import css from './Welcome.module.css';
import { NavLink } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className={css.background}>
      <Logo big />
      
      <p className={css.info}>
          Turn overwhelming lists into satisfying checkmarks, one organized board
          at a time!
      </p>

      <div className={css.authNav}>
        <NavLink to="/auth/register">
          <Button typeStyle="secondary" buttonText="Registration" />
        </NavLink>
        <NavLink to="/auth/login">
          <Button typeStyle="secondary" buttonText="Log In" />
        </NavLink>
      </div>
      
    </div>
  );
};

export default Welcome;
