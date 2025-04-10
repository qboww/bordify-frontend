import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: 'showAll',
  sortOrder: 'default',
  deadlineSortOrder: 'default',
  deadlineFilter: 'all'
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  selectors: {
    selectNewFilter: state => state.filter,
    selectSortOrder: state => state.sortOrder,
    selectDeadlineSortOrder: state => state.deadlineSortOrder, 
    selectDeadlineFilter: state => state.deadlineFilter
  },
  reducers: {
    setNewFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setDeadlineSortOrder: (state, action) => {
      state.deadlineSortOrder = action.payload;
    },
    setDeadlineFilter: (state, action) => {
      state.deadlineFilter = action.payload;
    }
  },
});

export const { setNewFilter, setSortOrder, setDeadlineSortOrder, setDeadlineFilter  } = filterSlice.actions;
export const { selectNewFilter, selectSortOrder, selectDeadlineSortOrder, selectDeadlineFilter  } = filterSlice.selectors;
export const filterReducer = filterSlice.reducer;