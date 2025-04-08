import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: 'showAll',
  sortOrder: 'default',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  selectors: {
    selectNewFilter: state => state.filter,
    selectSortOrder: state => state.sortOrder, 
  },
  reducers: {
    setNewFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

export const { setNewFilter, setSortOrder } = filterSlice.actions;
export const { selectNewFilter, selectSortOrder } = filterSlice.selectors;
export const filterReducer = filterSlice.reducer;