import { createSlice } from '@reduxjs/toolkit';
import {
  createBoardThunk,
  deleteBoardThunk,
  fetchBoardsThunk,
  updateBoardThunk,
} from './boardsOperations';
const initialState = {
  boards: [],
  boardsIds: [],
  isLoading: false,
  error: null,
  boardBackground: {},
  currentBoard: null,
  justCreatedBoard: null,
  justUpdatedBoard: null,
};
const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setCurrentBoard: (state, { payload }) => {
      state.currentBoard = payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchBoardsThunk.fulfilled, (state, { payload }) => {
        state.error = false;
        state.isLoading = false;
        state.boards = payload.data;
        state.boardsIds = payload.data.map(board => board._id);
      })
      .addCase(createBoardThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.boards.push(payload.data);
        state.justCreatedBoard = payload.data;
      })
      .addCase(updateBoardThunk.fulfilled, (state, action) => {
        const board = state.boards.find(
          board => board._id === action.payload.data._id
        );
        if (board) {
          board.title = action.payload.data.title;
          board.icon = action.payload.data.icon;
          board.backgroundImg = action.payload.data.backgroundImg;
        }
        state.boardBackground = action.payload.data.backgroundImg;
      })
      .addCase(deleteBoardThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.boards = state.boards.filter(
          board => board._id !== action.payload.data._id
        );
      });
  },
});
export const boardsReducer = boardSlice.reducer;
export const { setCurrentBoard, deleteCurrentBoard } = boardSlice.actions;
