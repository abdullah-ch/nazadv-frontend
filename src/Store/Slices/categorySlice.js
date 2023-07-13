import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

export const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    value: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state = null;
    });
  },
});

export const { setCategories, resetState } = categorySlice.actions;

export const selectCategories = (state) => state.categories.value;

export default categorySlice.reducer;
