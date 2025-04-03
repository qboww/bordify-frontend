import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: 'showAll',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  selectors: {
    selectNewFilter: state => state.filter,
  },

  reducers: {
    setNewFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setNewFilter } = filterSlice.actions;
export const { selectNewFilter } = filterSlice.selectors;
export const filterReducer = filterSlice.reducer;
