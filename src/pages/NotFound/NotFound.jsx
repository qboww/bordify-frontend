import { useNavigate } from 'react-router-dom';
import css from './NotFound.module.css';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <div className={css.textContainer}>
        <h1 className={css.title}>404</h1>
        <p className={css.message}>Oops! Page not found</p>
      </div>
      <button
        className={css.button}
        onClick={() => navigate('/')}
        type="button"
      >
        Go To Home
      </button>
    </div>
  );
};

export default NotFound;