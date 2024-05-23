import { createSlice } from "@reduxjs/toolkit";

const categoryProductSlice = createSlice({
  name: "categoryProduct",
  initialState: {
    categoryProducts: {
      data: [],
      isFetching: false,
      error: false,
    },
    singleCategoryProduct: {
      data: {},
      isFetching: false,
      error: false,
    }
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
    getSingleCategoryProductStart: (state) => {
      state.singleCategoryProduct.isFetching = true;
      state.singleCategoryProduct.error = false;
    },
    getSingleCategoryProductSuccess: (state, action) => {
      state.singleCategoryProduct.isFetching = false;
      state.singleCategoryProduct.data = action.payload;
      state.singleCategoryProduct.error = false;
    },
    getSingleCategoryProductFailure: (state) => {
      state.singleCategoryProduct.isFetching = false;
      state.singleCategoryProduct.error = true;
    },
  },
});

export const {
  getCategoryProductsStart,
  getCategoryProductsSuccess,
  getCategoryProductsFailure,
  getSingleCategoryProductStart,
  getSingleCategoryProductSuccess,
  getSingleCategoryProductFailure,
} = categoryProductSlice.actions;

export default categoryProductSlice.reducer;
