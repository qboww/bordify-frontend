import { createAsyncThunk } from '@reduxjs/toolkit';
import { bordifyApi } from '../../config/api';

export const createNewTaskThunk = createAsyncThunk(
  'tasks/createTask',
  async ({boardid, columnid, task}, thunkAPI) => {
    try {
      const { data } = await bordifyApi.post(
        `api/boards/${boardid}/columns/${columnid}/tasks`,
        task
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTaskThunk = createAsyncThunk(
  'tasks/updateTask',
  async (data, thunkAPI) => {
    const { boardid, columnid, taskid, body } = data;

    try {
      const { data } = await bordifyApi.patch(
        `api/boards/${boardid}/columns/${columnid}/tasks/${taskid}`,
        body
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  'tasks/deleteTask',
  async (data, thunkAPI) => {

    try {
      await bordifyApi.delete(
        `api/boards/${data.boardid}/columns/${data.columnid}/tasks/${data.taskid}`
      );
      return data.taskid;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
