import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { RegistrationSchame } from '../../schemas/AuthSchemas';
import css from './RegistrationForm.module.css';
// import Loader from '../Loader/Loader';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from '../../redux/user/userOperations';

import icon from '../../images/icons.svg';
import InputField from '../InputField/InputField';
import { Button } from '../Button/Button';
import { selectIsLoading } from '../../redux/user/userSelectors';
import Loader from '../Loader/Loader';

const RegistrationForm = () => {
  const dispatch = useDispatch(); // from redux

  const isLoading = useSelector(selectIsLoading);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(RegistrationSchame),
    mode: 'onChange',
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const onSubmit = data => {
    dispatch(registerThunk(data));
    reset();
  };

  return (
    <div className={css.background}>
      {isLoading && <Loader />}
      <div className={css.formWrapper}>
        <ul className={css.authNav}>
          <li>
            <p className={css.authLink}>Registration</p>
          </li>
          <li>
            <NavLink className={css.activeAuthLink} to={`/auth/login`}>
              Log in
            </NavLink>
          </li>
        </ul>

        <form
          className={css.formStyle}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="nope"
        >
          <label>
            <InputField
              type="text"
              name="username"
              placeholder="Enter your name"
              register={register}
            />
            <p className={css.errorStyles}>{errors.name?.message}</p>
          </label>
          <label>
            <InputField
              type="email"
              name="email"
              placeholder="Enter your email"
              register={register}
            />
            <p className={css.errorStyles}>{errors.email?.message}</p>
          </label>
          <label>
            <div className={css.passwordContainer}>
              <InputField
                type={passwordShown ? 'text' : 'password'}
                placeholder="Create a password"
                name="password"
                register={register}
              />
              <button
                type="button"
                className={css.buttonShowPassword}
                onClick={togglePasswordVisibility}
              >
                <svg width="20px" height="20px">
                  <use href={icon + '#icon-eye'}></use>
                </svg>
              </button>
            </div>
            <p className={css.errorStyles}>{errors.password?.message}</p>
          </label>
          <Button
            className={css.buttonStyles}
            type="submit"
            buttonText="Register Now"
          />
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
