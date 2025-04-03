import { useDispatch } from 'react-redux';
import { closeResendVerifyEmailModal } from '../../redux/modal/modalSlice';
import { Button } from '../Button/Button';

const EmailResendModal = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(closeResendVerifyEmailModal());
  };

  return (
    <>
      <div>Please check your email for further instructions</div>
      <Button buttonText="Close" onClick={handleClick} />
    </>
  );
};

export default EmailResendModal;
