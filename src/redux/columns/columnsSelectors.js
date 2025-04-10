import { createSelector } from '@reduxjs/toolkit';
import { selectNewFilter, selectSortOrder, selectDeadlineSortOrder, selectDeadlineFilter } from './filterSlice';

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
  [selectColumnsWithinBoard, selectNewFilter, selectSortOrder, selectDeadlineSortOrder, selectDeadlineFilter],
  (columns, filter, sortOrder, deadlineSortOrder, deadlineFilter) => {
    let filteredColumns = columns;
    
    if (filter !== 'showAll') {
      filteredColumns = columns.map(column => {
        const tasks = column.tasks.filter(task => task.priority === filter);
        return { ...column, tasks };
      });
    }

    if (deadlineFilter !== 'all') {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      filteredColumns = filteredColumns.map(column => {
        const tasks = column.tasks.filter(task => {
          if (!task.deadline) return false;
          
          const taskDate = new Date(task.deadline);
          taskDate.setHours(0, 0, 0, 0);
          
          if (deadlineFilter === 'overdue') {
            return taskDate < currentDate;
          } else if (deadlineFilter === 'upcoming') {
            return taskDate >= currentDate;
          }
          return true;
        });
        return { ...column, tasks };
      });
    }

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

    if (deadlineSortOrder !== 'default') {
      filteredColumns = filteredColumns.map(column => {
        const tasks = [...column.tasks].sort((a, b) => {
          const dateA = a.deadline ? new Date(a.deadline) : null;
          const dateB = b.deadline ? new Date(b.deadline) : null;
          
          if (!dateA && !dateB) return 0;
          if (!dateA) return 1;
          if (!dateB) return -1;
          
          if (deadlineSortOrder === 'asc') {
            return dateA - dateB;
          } else {
            return dateB - dateA;
          }
        });
        return { ...column, tasks };
      });
    }

    return filteredColumns;
  }
);