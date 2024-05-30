import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: {
      data: [],
      isFetching: false,
      error: false,
    },
    newProduct: {
      message: "",
      isFetching: false,
      error: false,
    },
    singleProduct: {
      data: {},
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getAllProductsStart: (state) => {
      state.products.isFetching = true;
      state.products.error = false;
    },
    getAllProductsSuccess: (state, action) => {
      state.products.isFetching = false;
      state.products.data = action.payload;
      state.products.error = false;
    },
    getAllProductsFailure: (state) => {
      state.products.isFetching = false;
      state.products.error = true;
    },
    addNewProductStart: (state) => {
      state.newProduct.isFetching = true;
      state.newProduct.error = false;
    },
    addNewProductSuccess: (state, action) => {
      state.newProduct.isFetching = false;
      state.newProduct.message = action.payload;
      state.newProduct.error = false;
    },
    addNewProductFailure: (state) => {
      state.newProduct.isFetching = false;
      state.newProduct.error = true;
    },
    getSingleProductStart: (state) => {
      state.singleProduct.isFetching = true;
      state.singleProduct.error = false;
    },
    getSingleProductSuccess: (state, action) => {
      state.singleProduct.isFetching = false;
      state.singleProduct.data = action.payload;
      state.singleProduct.error = false;
    },
    getSingleProductFailure: (state) => {
      state.singleProduct.isFetching = false;
      state.singleProduct.error = true;
    },
    deleteProductSuccess: (state, action) => {
      state.products.data = state.products.data.filter(
        product => product.id !== action.payload
      )
    }
  },
});

export const {
  getAllProductsStart,
  getAllProductsSuccess,
  getAllProductsFailure,
  addNewProductStart,
  addNewProductSuccess,
  addNewProductFailure,
  getSingleProductStart,
  getSingleProductSuccess,
  getSingleProductFailure,
  deleteProductSuccess
} = productSlice.actions;
export default productSlice.reducer;
