import { createSlice } from '@reduxjs/toolkit';
import {
  getAllCoulumnsWithBoardIdThunk,
  createNewColumnThunk,
  updateColumnThunk,
  deleteColumnThunk,
} from './columnsOperations';
import {
  createNewTaskThunk,
  deleteTaskThunk,
  updateTaskThunk,
} from '../tasks/tasksOperations';
import {
  createBoardThunk,
  deleteBoardThunk,
  updateBoardThunk,
} from '../boards/boardsOperations';
import { logoutThunk } from '../user/userOperations';

const initialState = {
  boardId: '',
  boardTitle: '',
  boardIcon: '',
  boardBackground: {},
  columnsL: [],
  columnsOrderId: [],
  tasks: [],
  currentBoardId: {},
  status: 'idle',
  isDragging: false,
  undoList: [],
  tasksOrderId: [],
  isLoading: false,
  error: null,
};
const columnSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    startDrag: state => {
      state.isDragging = true;
    },
    stopDrag: state => {
      state.isDragging = false;
    },
    undoDrag: state => {
      if (state.undoList.length) {
        const lastState = state.undoList[state.undoList.length - 1];
        state.columnsL = lastState.columnsL;
      }
    },
    updateTaskOrder: (state, action) => {
      const { source, destination, sourceColumnId, destinationColumnId } =
        action.payload;
      if (!destination) {
        return;
      }
      const sourceColumn = state.columnsL.find(
        column => column._id === sourceColumnId
      );
      const destinationColumn = state.columnsL.find(
        column => column._id === destinationColumnId
      );

      if (sourceColumnId === destinationColumnId) {
        const [removed] = sourceColumn.tasks.splice(source.index, 1);
        sourceColumn.tasks.splice(destination.index, 0, removed);
      } else {
        const [removed] = sourceColumn.tasks.splice(source.index, 1);
        destinationColumn.tasks.splice(destination.index, 0, removed);
      }
    },
  },

  extraReducers: builder => {
    builder
      .addCase(
        getAllCoulumnsWithBoardIdThunk.fulfilled,
        (state, { payload }) => {
          state.error = false;
          state.isLoading = false;
          state.boardId = payload._id;
          state.boardTitle = payload.title;
          state.boardIcon = payload.icon;
          state.boardBackground = payload.backgroundImg;
          state.currentBoardId = payload._id;
          state.columnsL = payload.columns;
          state.columnsOrderId = payload.columns.map(column => column._id);

          state.tasks = payload.columns.reduce((acc, column) => {
            return [...acc, ...column.tasks];
          }, []);

          state.tasksOrderId = payload.columns.reduce((acc, column) => {
            return [...acc, ...column.tasks.map(task => task._id)];
          }, []);
        }
      )
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.currentBoardId = {};
      })
      .addCase(createBoardThunk.fulfilled, (state, action) => {
        state.backgroundImg = action.payload.data.backgroundImg;
      })
      .addCase(deleteBoardThunk.fulfilled, (state, action) => {
        if (action.payload === state.currentBoardId) {
          state.currentBoardId = {};
        }
      })
      .addCase(createNewColumnThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.columnsL.push(payload.data);
      })
      .addCase(updateColumnThunk.fulfilled, (state, action) => {
        const column = state.columnsL.find(
          column => column._id === action.payload.data._id
        );
        column.title = action.payload.data.title;
      })
      .addCase(updateBoardThunk.fulfilled, (state, action) => {
        state.boardBackground = action.payload.data.backgroundImg;
        state.boardTitle = action.payload.data.title;
        state.boardIcon = action.payload.data.icon;
      })
      .addCase(deleteColumnThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.columnsL.findIndex(
          column => column._id === action.payload
        );
        state.columnsL.splice(index, 1);
      })
      .addCase(createNewTaskThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const { columnid } = action.meta.arg;
        const column = state.columnsL.find(column => column._id === columnid);
        if (column) {
          const newTask = action.payload.data;
          column.tasks.push(newTask);
        } else {
          console.error(`Column with id ${columnid} not found`);
        }
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const { columnid, taskid } = action.meta.arg;
        const column = state.columnsL.find(column => column._id === columnid);
        if (column) {
          column.tasks = column.tasks.filter(task => task._id !== taskid);
        }
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const { columnid, taskid } = action.meta.arg;
        const column = state.columnsL.find(column => column._id === columnid);
        if (column) {
          const taskIndex = column.tasks.findIndex(task => task._id === taskid);
          if (taskIndex !== -1) {
            column.tasks[taskIndex] = action.payload.data;
          }
        }
      })
      .addMatcher(
        action =>
          action.type.includes('fulfilled') && action.type.includes('columns'),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        action =>
          action.type.includes('pending') && action.type.includes('columns'),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      );
  },
});
export const {
  startDrag,
  stopDrag,
  undoDrag,
  updateTaskOrder,
  deleteTask,
} = columnSlice.actions;
export const columnsReducer = columnSlice.reducer;
