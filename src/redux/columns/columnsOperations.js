import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskProApi } from '../../config/api';

//task-pro-backend-xdd4.onrender.com/api/board/?_id=${boardId}
export const getAllCoulumnsWithBoardIdThunk = createAsyncThunk(
  'columns/getAllColumns',
  async (boardId, thunkAPI) => {
    try {
      const data = await taskProApi.get(`/api/boards/${boardId}`);
      return data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//task-pro-backend-xdd4.onrender.com/api/boards/:${boardid}/columns
export const createNewColumnThunk = createAsyncThunk(
  'columns/createColumn',
  async ({ boardid, title }, thunkAPI) => {
    try {
      const data = await taskProApi.post(`/api/boards/${boardid}/columns`, {
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
      const { data } = await taskProApi.patch(
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
      await taskProApi.delete(`api/boards/${boardid}/columns/${columnid}`);
      return columnid;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
