import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../redux/user/userSlice';
import { logEvent } from "firebase/analytics";
import { analytics } from '../../config/firebase-config';
import Loader from '../../components/Loader/Loader';
import { selectIsLoggined } from '../../redux/user/userSelectors';

export const GoogleRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggined);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard', { replace: true });
      return;
    }

    const params = {
      sid: searchParams.get('sid'),
      accessToken: searchParams.get('accessToken'),
      refreshToken: searchParams.get('refreshToken')
    };

    if (params.sid && params.accessToken && params.refreshToken) {
      // Dispatch the action
      dispatch(setCredentials(params));
      
      // Track login and navigate
      if (analytics) {
        logEvent(analytics, 'login', { method: 'Google' });
      }
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/auth/login', { 
        replace: true,
        state: { error: 'google_auth_failed' }
      });
    }
  }, [dispatch, navigate, searchParams, isLoggedIn]);

  return <Loader />;
};

export default GoogleRedirectPage;