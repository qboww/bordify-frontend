import { createSlice } from '@reduxjs/toolkit';
import { contactSupportThunk } from './supportOperations';

const initialState = {
  comment: {
    email: '',
    message: '',
  },
  isLoading: false,
  error: false,
};

const supportSlice = createSlice({
  name: 'support',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(contactSupportThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.comment.email = payload.email;
        state.comment.message = payload.message;
      })
      .addCase(contactSupportThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(contactSupportThunk.rejected, (state, { payload }) => {
        state.error = payload;
      });
  },
});

export const supportReducer = supportSlice.reducer;
