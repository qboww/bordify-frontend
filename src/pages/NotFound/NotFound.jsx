import { useNavigate } from 'react-router-dom';

import img from '../../assets/images/notFound/oops.webp';

import css from './NotFound.module.css';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <div className={css.thumb}>
        <img className={css.img} src={img} alt="page not found" />
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
