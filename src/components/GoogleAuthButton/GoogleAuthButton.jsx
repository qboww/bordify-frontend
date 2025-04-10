import css from './GoogleAuthButton.module.css';
import { FcGoogle } from 'react-icons/fc';

export const GoogleAuthButton = ({ onClick }) => {
  return (
    <button type="button" className={css.googleBtn} onClick={onClick}>
      <FcGoogle size={24} className={css.googleIcon} />
      Continue with Google
    </button>
  );
};