import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi } from '../../config/api';
import { toast } from 'react-toastify';

export const contactSupportThunk = createAsyncThunk(
  'support/contactSupport',
  async (body, thunkApi) => {
    try {
      const { data } = await taskProApi.post('api/support', body);
      toast.success('Your message was sent!!');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
