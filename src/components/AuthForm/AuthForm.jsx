import { useForm } from 'react-hook-form';
import css from './AuthForm.module.css';
// import Loader from '../Loader/Loader';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import InputField from '../InputField/InputField';
import { Button } from '../Button/Button';
import InputPassword from '../InputPassword/InputPassword';
import {
  selectIsVerified,
  selectUserEmail,
} from '../../redux/user/userSelectors';
import { useEffect } from 'react';
import {
  selectModal,
  selectResendVerifyEmailModal,
} from '../../redux/modal/modalSelector';
import {
  closeResendVerifyEmailModal,
  openModal,
  openResendVerifyEmailModal,
} from '../../redux/modal/modalSlice';
import { createPortal } from 'react-dom';
import Modal from '../../components/Modal/Modal';
import EmailResendModal from '../EmailResendModal/EmailResendModal';
import { setIsVerified, setUserEmail } from '../../redux/user/userSlice';
import { resendVerificationEmailThunk } from '../../redux/user/userOperations';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthForm = ({
  registerForm = false,
  loginForm = false,
  scheme,
  onSubmitThunk,
}) => {
  const userEmail = useSelector(selectUserEmail);
  const isVerified = useSelector(selectIsVerified);
  const isResendVerifyEmailModalOpen = useSelector(
    selectResendVerifyEmailModal
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isVerified === false) {
      dispatch(openResendVerifyEmailModal());

      dispatch(resendVerificationEmailThunk(userEmail));

      dispatch(setIsVerified());
    }
  }, [isVerified, dispatch]);

  const isLoading = false;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: registerForm
      ? { username: '', email: '', password: '' }
      : { email: '', password: '' },
    resolver: yupResolver(scheme),
    mode: 'onChange',
  });

  const onSubmit = async data => {
    try {
      await dispatch(onSubmitThunk(data)).unwrap();
      toast.success('Login OK!');
      await dispatch(setUserEmail(data));
      dispatch(openResendVerifyEmailModal());
      reset();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      {isResendVerifyEmailModalOpen &&
        createPortal(
          <Modal
            isOpen={openResendVerifyEmailModal}
            closeModal={closeResendVerifyEmailModal}
            title={'Email verification is required'}
          >
            <EmailResendModal />
          </Modal>,
          document.getElementById('modal-root')
        )}
      <form
        className={css.formStyle}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="nope"
      >
        {registerForm && (
          <InputField
            type="text"
            name="username"
            placeholder="Enter your name"
            register={register}
            errors={errors}
          />
        )}
        <InputField
          type="email"
          name="email"
          placeholder="Enter your email"
          register={register}
          errors={errors}
        />
        <InputPassword name="password" register={register} errors={errors} />
        <Button
          className={css.buttonStyles}
          type="submit"
          buttonText={registerForm ? 'Register Now' : 'Log In Now'}
        />
      </form>
    </>
  );
};

export default AuthForm;
