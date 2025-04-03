import { createSlice } from '@reduxjs/toolkit';
import { registerThunk } from './userOperations';
const initialState = {
  user: { username: '', email: '', password: '' },
  message: '',
  isVeryfied: false,
  isLoggined: false,
  isLoading: false,
  error: false,
};

const registerSlice = createSlice({
  name: 'registration',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.user = payload.data.user;
        state.isVeryfied = false;
        state.isLoggined = false;
        state.isLoading = false;
      })
      .addCase(registerThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(registerThunk.rejected, state => {
        state.error = true;
        state.isLoading = false;
      });
  },
});

export const registerReducer = registerSlice.reducer;
