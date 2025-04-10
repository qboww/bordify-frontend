import { createAsyncThunk } from '@reduxjs/toolkit';
import { bordifyApi } from '../../config/api';
import { bordifyApiUnAutorized } from '../../config/api';

export const setToken = accessToken => {
  bordifyApi.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};
export const clearToken = () => {
  bordifyApi.defaults.headers.common.Authorization = ``;
};
export const setTokenOnLogin = accessToken => {
  bordifyApiUnAutorized.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
};

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (credentials, thunkApi) => {
    try {
      console.log('Sending registration request with:', credentials);
      const { data } = await bordifyApiUnAutorized.post(
        'api/auth/register',
        credentials
      );
      console.log('Registration response:', data);
      return data;
    } catch (error) {
      console.error(
        'Registration error:',
        error.response?.data || error.message
      );
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, thunkApi) => {
    try {
      const { data } = await bordifyApiUnAutorized.post(
        'api/auth/login',
        credentials
      );

      if (data.data.user?.isVerified === false) {
        return thunkApi.rejectWithValue('Please verify your email first');
      }

      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      localStorage.setItem('sid', data.data.sid);
      
      setToken(data.data.accessToken);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.status);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkApi) => {
    try {
      await bordifyApi.post('api/auth/logout');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('sid');
      clearToken();
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshTokensThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const sid = thunkAPI.getState().user.sid;
    const refreshToken = thunkAPI.getState().user.refreshToken;
    if (refreshToken && sid) {
      try {
        setToken(refreshToken);
        const { data } = await bordifyApi.post('api/auth/refresh', {
          sid,
        });
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
    return thunkAPI.rejectWithValue('No refresh token or sid');
  }
);

export const refreshUserThunk = createAsyncThunk(
  'auth/currentUser',
  async (_, thunkAPI) => {
    try {
      await thunkAPI.dispatch(refreshTokensThunk());
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }

    const accessToken = thunkAPI.getState().user.accessToken;
    setToken(accessToken);
    if (!accessToken) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
    try {
      const { data } = await bordifyApi.get('api/auth/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserPreferencesThunk = createAsyncThunk(
  'auth/updateUserPreferences',
  async (preferences, thunkAPI) => {
    try {
      const { data } = await bordifyApi.patch('api/auth/update', preferences, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const resendVerificationEmailThunk = createAsyncThunk(
  'auth/resendVerificationEmail',
  async (body, thunkAPI) => {
    try {
      const { data } = await bordifyApi.post('api/auth/verify', {
        email: body,
      });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const googleAuthThunk = createAsyncThunk(
  'auth/google',
  async (_, thunkAPI) => {
    try {
      window.location.href = 'http://localhost:3000/api/auth/google';
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const googleAuthRedirectThunk = createAsyncThunk(
  'auth/google-redirect',
  async (credentials, thunkAPI) => {
    try {
      const { sid, accessToken, refreshToken } = credentials;

      thunkAPI.dispatch(
        setCredentials({
          sid,
          accessToken,
          refreshToken,
        })
      );

      setToken(accessToken);

      const { data } = await bordifyApi.get('api/auth/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
