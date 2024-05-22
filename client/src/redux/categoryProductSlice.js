import { createSlice } from "@reduxjs/toolkit";

const categoryProductSlice = createSlice({
  name: "categoryProduct",
  initialState: {
    categoryProducts: {
      data: [],
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getCategoryProductsStart: (state) => {
      state.categoryProducts.isFetching = true;
      state.categoryProducts.error = false;
    },
    getCategoryProductsSuccess: (state, action) => {
      state.categoryProducts.isFetching = false;
      state.categoryProducts.data = action.payload;
      state.categoryProducts.error = false;
    },
    getCategoryProductsFailure: (state) => {
      state.categoryProducts.isFetching = false;
      state.categoryProducts.error = true;
    },
  },
});

export const {
  getCategoryProductsStart,
  getCategoryProductsSuccess,
  getCategoryProductsFailure,
} = categoryProductSlice.actions;

export default categoryProductSlice.reducer;
