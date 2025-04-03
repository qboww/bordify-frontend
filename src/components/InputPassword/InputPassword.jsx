import { useState } from 'react';
import InputField from '../InputField/InputField';
import css from './InputPassword.module.css';
import icon from '../../images/icons.svg';

const InputPassword = ({
  register,
  errors = {},
  disabled,
  defaultValue,
  name = 'password',
}) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div className={css.passwordContainer}>
      <InputField
        type={passwordShown ? 'text' : 'password'}
        placeholder="Create a password"
        name={name}
        value={defaultValue}
        register={register}
        disabled={disabled}
        errors={errors}
      />
      <button
        type="button"
        className={css.buttonShowPassword}
        onClick={!disabled ? togglePasswordVisibility : null}
      >
        <svg width="20px" height="20px">
          <use href={icon + '#icon-eye'}></use>
        </svg>
      </button>
    </div>
  );
};
export default InputPassword;
