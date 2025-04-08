import { createSelector } from '@reduxjs/toolkit';
import { selectNewFilter, selectSortOrder  } from './filterSlice';
export const selectBoardId = state => state.columns.boardId;
export const selectBoardTitle = state => state.columns.boardTitle;
export const selectBoardIcon = state => state.columns.boardIcon;
export const selectBoardBackground = state => state.columns.boardBackground;
export const selectTasksWithinColumn = state => state.columns.tasksWithinBoard;
export const selectColumnsWithinBoard = state => state.columns.columnsL;
export const selectCurrentBoardId = state => state.columns.currentBoardId;
export const selectLoadingData = state => state.columns.isLoading;
export const selectTasks = state => state.columns.tasks;

const priorityOrder = {
  'high': 3,
  'medium': 2,
  'low': 1,
  'none': 0
};

export const selectFilteredTasks = createSelector(
  [selectColumnsWithinBoard, selectNewFilter, selectSortOrder],
  (columns, filter, sortOrder) => {
    // First filter the tasks
    let filteredColumns = columns;
    
    if (filter !== 'showAll') {
      filteredColumns = columns.map(column => {
        const tasks = column.tasks.filter(task => task.priority === filter);
        return { ...column, tasks };
      });
    }

    // Then sort if needed
    if (sortOrder !== 'default') {
      filteredColumns = filteredColumns.map(column => {
        const tasks = [...column.tasks].sort((a, b) => {
          if (sortOrder === 'asc') {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          } else {
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          }
        });
        return { ...column, tasks };
      });
    }

    return filteredColumns;
  }
);