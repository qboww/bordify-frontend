import { createAsyncThunk } from '@reduxjs/toolkit';
import { bordifyApi } from '../../config/api';

export const fetchBoardsThunk = createAsyncThunk(
  'boards/fetchBoards',
  async (_, thunkAPI) => {
    try {
      const { data } = await bordifyApi.get('api/boards');

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createBoardThunk = createAsyncThunk(
  'boards/createBoard',
  async (boardData, thunkAPI) => {
    try {
      const { data } = await bordifyApi.post('api/boards', boardData);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateBoardThunk = createAsyncThunk(
  'boards/updateBoard',
  async (board, thunkAPI) => {
    const { _id, ...body } = board;
    try {
      const { data } = await bordifyApi.patch(`api/boards/${_id}`, body);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteBoardThunk = createAsyncThunk(
  'boards/deleteBoard',
  async (boardId, thunkAPI) => {
    try {
      await bordifyApi.delete(`api/boards/${boardId}`);
      return boardId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const backgroundUrl = createAsyncThunk(
//   'backgrounds',
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await bordifyApi.get('/api/backgrounds');
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const changeBackground = createAsyncThunk(
//   'boards/changeBackground',
//   async ({ id, currentBg }, thunkAPI) => {
//     try {
//       const { data } = await bordifyApi.patch(`/api/boards/${id}/currentBg`, {
//         currentBg,
//       });
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const fetchBoardByIdThunk = createAsyncThunk(
  'board/fetchBoardById',
  async (boardId, thunkAPI) => {
    try {
      const { data } = await bordifyApi.get(`api/boards/${boardId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
