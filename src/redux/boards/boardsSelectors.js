import { createSelector } from '@reduxjs/toolkit';

export const selectBoards = state => state.boards.boards;
export const selectBoardsIds = state => state.boards.boardsIds;
export const selectBoardBackGround = state => state.boards.boardBackground;
export const selectJustCreatedBoard = state => state.boards.justCreatedBoard;
export const selectJustUpdatedBoard = state => state.boards.justUpdatedBoard;
export const selectCurrentBoard = state => state.boards.currentBoard;
