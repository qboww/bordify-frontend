// src/pages/GoogleRedirectPage/GoogleRedirectPage.jsx
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { googleAuthRedirectThunk } from '../../redux/user/userOperations';

const GoogleRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const sid = searchParams.get('sid');
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (sid && accessToken && refreshToken) {
      dispatch(
        googleAuthRedirectThunk({
          sid,
          accessToken,
          refreshToken,
        })
      );
    }
  }, [dispatch, searchParams]);

  return null;
};

export default GoogleRedirectPage;