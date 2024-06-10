import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: {
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
  },
});

export const { getAllOrderStart, getAllOrderSuccess, getAllOrderFailure } =
  orderSlice.actions;
export default orderSlice.reducer;
