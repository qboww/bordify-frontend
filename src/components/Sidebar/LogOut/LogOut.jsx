import { useDispatch } from 'react-redux';
import icon from '../../../images/icons.svg';
import s from './LogOut.module.css';

import { logoutThunk } from '../../../redux/user/userOperations';

const LogOut = () => {
  const dispatch = useDispatch();
  return (
    <button
      className={s.btn}
      type="button"
      onClick={() => dispatch(logoutThunk())}
    >
      <svg className={s.icon} width="32px" height="32px">
        <use href={icon + '#icon-logout'}></use>
      </svg>
      Log out
    </button>
  );
};

export default LogOut;
