import { createSelector } from '@reduxjs/toolkit';
import { selectNewFilter } from './filterSlice';
export const selectBoardId = state => state.columns.boardId;
export const selectBoardTitle = state => state.columns.boardTitle;
export const selectBoardIcon = state => state.columns.boardIcon;
export const selectBoardBackground = state => state.columns.boardBackground;
export const selectTasksWithinColumn = state => state.columns.tasksWithinBoard;
// export const selectFilteredColumns = state => state.columns.filteredColumns;
// export const selectFilter = state => state.columns.filter;
export const selectColumnsWithinBoard = state => state.columns.columnsL;
// export const selectColumnsOrderId = state => state.columns.columnsOrderId;
// export const selectTasksOrderId = state => state.columns.tasksOrderId;
export const selectCurrentBoardId = state => state.columns.currentBoardId;
export const selectLoadingData = state => state.columns.isLoading;
export const selectTasks = state => state.columns.tasks;

export const selectFilteredTasks = createSelector(
  [selectColumnsWithinBoard, selectNewFilter],
  (columns, filter) => {
    switch (filter) {
      case 'showAll':
        return columns;
      case 'high':
        return columns.map(column => {
          const tasks = column.tasks.filter(task => task.priority === 'high');
          return { ...column, tasks };
        });
      case 'medium':
        return columns.map(column => {
          const tasks = column.tasks.filter(task => task.priority === 'medium');
          return { ...column, tasks };
        });
      case 'low':
        return columns.map(column => {
          const tasks = column.tasks.filter(task => task.priority === 'low');
          return { ...column, tasks };
        });

      default:
        return columns;
    }
  }
);
