import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

export const productListSlice = createSlice({
  name: 'productList',
  initialState: {
    value: null,
    isLoggedIn: false,
  },
  reducers: {
    setProductList: (state, action) => {
      state.value = action.payload;
    },

    resetState: (state, action) => {
      state = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state = null;
    });
  },
});

export const { setProductList, resetState } = productListSlice.actions;

export const selectproductList = (state) => state.productList.value;

export default productListSlice.reducer;
