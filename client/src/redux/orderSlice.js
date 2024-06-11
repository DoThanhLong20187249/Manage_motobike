import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: {
      data: null,
      isFeching: false,
      error: false,
    },
    singleOrder: {
      data: null,
      isFeching: false,
      error: false,
    },
  },
  reducers: {
    getAllOrderStart: (state) => {
      state.orders.isFeching = true;
      state.orders.error = false;
    },
    getAllOrderSuccess: (state, action) => {
      state.orders.data = action.payload;
      state.orders.isFeching = false;
      state.orders.error = false;
    },
    getAllOrderFailure: (state) => {
      state.orders.isFeching = false;
      state.orders.error = true;
    },
    deleteOrder: (state, action) => {
      state.orders.data = state.orders.data.filter(
        (order) => order.id !== action.payload
      );
    },
    getSingleOrderStart: (state) => {
      state.singleOrder.isFeching = true;
      state.singleOrder.error = false;
    },
    getSingleOrderSuccess: (state, action) => {
      state.singleOrder.data = action.payload;
      state.singleOrder.isFeching = false;
      state.singleOrder.error = false;
    },
    getSingleOrderFailure: (state) => {
      state.singleOrder.isFeching = false;
      state.singleOrder.error = true;
    },
  },
});

export const {
  getAllOrderStart,
  getAllOrderSuccess,
  getAllOrderFailure,
  deleteOrder,
  getSingleOrderStart,
  getSingleOrderSuccess,
  getSingleOrderFailure,
} = orderSlice.actions;
export default orderSlice.reducer;
