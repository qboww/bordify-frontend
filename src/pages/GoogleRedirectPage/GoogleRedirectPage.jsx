import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/user/userSlice';

export const GoogleRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const sid = searchParams.get('sid');
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (sid && accessToken && refreshToken) {
      dispatch(setCredentials({
        sid,
        accessToken,
        refreshToken
      }));
      
      // Redirect to dashboard or home page after successful login
      navigate('/dashboard'); // Or your desired route
    } else {
      // Handle error case
      navigate('/auth/login?error=google_auth_failed');
    }
  }, [dispatch, navigate, searchParams]);
  

  return null;
};

export default GoogleRedirectPage;