import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: 'showAll',
  sortOrder: 'default',
  deadlineSortOrder: 'default'
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  selectors: {
    selectNewFilter: state => state.filter,
    selectSortOrder: state => state.sortOrder,
    selectDeadlineSortOrder: state => state.deadlineSortOrder, 
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
  },
});

export const { setNewFilter, setSortOrder, setDeadlineSortOrder  } = filterSlice.actions;
export const { selectNewFilter, selectSortOrder, selectDeadlineSortOrder  } = filterSlice.selectors;
export const filterReducer = filterSlice.reducer;