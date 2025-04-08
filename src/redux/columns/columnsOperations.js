import { createAsyncThunk } from '@reduxjs/toolkit';
import { bordifyApi } from '../../config/api';

export const getAllCoulumnsWithBoardIdThunk = createAsyncThunk(
  'columns/getAllColumns',
  async (boardId, thunkAPI) => {
    try {
      const data = await bordifyApi.get(`/api/boards/${boardId}`);
      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createNewColumnThunk = createAsyncThunk(
  'columns/createColumn',
  async ({ boardid, title }, thunkAPI) => {
    try {
      const data = await bordifyApi.post(`/api/boards/${boardid}/columns`, {
        title,
      });
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateColumnThunk = createAsyncThunk(
  'columns/updateColumn',
  async ({ boardid, columnid, title }, thunkAPI) => {
    try {
      const { data } = await bordifyApi.patch(
        `api/boards/${boardid}/columns/${columnid}`,
        { title }
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteColumnThunk = createAsyncThunk(
  'columns/deleteColumn',
  async ({ boardid, columnid }, thunkAPI) => {
    try {
      await bordifyApi.delete(`api/boards/${boardid}/columns/${columnid}`);
      return columnid;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
