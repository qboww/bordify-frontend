import { createSlice } from '@reduxjs/toolkit';
import {
  loginThunk,
  logoutThunk,
  refreshUserThunk,
  refreshTokensThunk,
  updateUserPreferencesThunk,
  setToken,
} from './userOperations';

const initialState = {
  login: { avatarUrl: '', email: '', username: '', theme: '' },
  accessToken: null,
  refreshToken: null,
  isVerified: null,
  userTheme: 'dark',
  userAvatar: '',
  userName: '',
  isLoggined: false,
  isLoading: false,
  isRefreshing: false,
  error: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsVerified: state => {
      state.isVerified = null;
    },
    setUserEmail: (state, { payload }) => {
      state.login.email = payload.email;
    },
    setCredentials: (state, { payload }) => {
      state.sid = payload.sid;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.isLoggined = true;
      state.isLoading = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.login = payload.data.user;
        state.email = payload.data.email;
        state.accessToken = payload.data.accessToken;
        state.refreshToken = payload.data.refreshToken;
        state.sid = payload.data.sid;
        state.userTheme = payload.data.user.theme;
        state.userAvatar = payload.data.user.avatarUrl;
        state.isLoggined = true;
        state.isLoading = false;
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.login = { email: '', password: '', theme: '', avatar: '' };
        state.accessToken = null;
        state.refreshToken = null;
        state.sid = null;
        state.isLoggined = false;
        state.userTheme = 'dark';
      })
      .addCase(loginThunk.pending, state => {
        state.isLoading = true;
        state.isVerified = null;
      })
      .addCase(loginThunk.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isVerified = payload === 403 ? false : null;
        state.error = true;
      })
      .addCase(refreshTokensThunk.fulfilled, (state, { payload }) => {
        setToken(payload.data.accessToken);
        state.accessToken = payload.data.accessToken;
        state.refreshToken = payload.data.refreshToken;
        state.sid = payload.data.sid;
      })
      .addCase(refreshUserThunk.fulfilled, (state, { payload }) => {
        state.login = payload.data;
        state.userTheme = payload.data.theme;
        state.userAvatar = payload.data.avatarUrl;
        state.isLoggined = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUserThunk.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUserThunk.rejected, state => {
        state.error = true;
        state.isRefreshing = false;
        state.isLoggined = false;
      })
      .addCase(updateUserPreferencesThunk.fulfilled, (state, action) => {
        state.userTheme = action.payload.theme;
        state.userAvatar = action.payload.avatarUrl;
        state.userName = action.payload.username;
        state.login.username = action.payload.username;
      })
      .addCase(updateUserPreferencesThunk.rejected, (state, action) => {
        console.error('Error updating user preferences:', action.payload);
      });
  },
});

export const { setIsVerified, setUserEmail, setCredentials } = userSlice.actions;
export const userReducer = userSlice.reducer;