import { createSlice } from "@reduxjs/toolkit";

const motocycleSlice = createSlice({
  name: "motocycle",
  initialState: {
    motocycles: {
      allMotocycles: null,
      isFetching: false,
      error: false,
    },
    singleMotocycle: {
      isFetching: false,
      error: false,
      data: null,
      message: null,
    },
  },
  reducers: {
    getMotocyclesStart: (state) => {
      state.motocycles.isFetching = true;
      state.motocycles.error = false;
    },
    getMotocyclesSuccess: (state, action) => {
      state.motocycles.isFetching = false;
      state.motocycles.allMotocycles = action.payload;
      state.motocycles.error = false;
    },
    getMotocyclesFailure: (state) => {
      state.motocycles.isFetching = false;
      state.motocycles.error = true;
    },
    getSingleMotocycleStart: (state) => {
      state.singleMotocycle.isFetching = true;
      state.singleMotocycle.error = false;
    },
    getSingleMotocycleSuccess: (state, action) => {
      state.singleMotocycle.isFetching = false;
      state.singleMotocycle.data = action.payload;
      state.singleMotocycle.error = false;
    },
    getSingleMotocycleFailure: (state) => {
      state.singleMotocycle.isFetching = false;
      state.singleMotocycle.error = true;
    },
    updateMotocycleStart: (state) => {
      state.singleMotocycle.isFetching = true;
      state.singleMotocycle.error = false;
    },
    updateMotocycleSuccess: (state, action) => {
      state.singleMotocycle.isFetching = false;
      state.singleMotocycle.message = action.payload;
      state.singleMotocycle.error = false;
    },
    updateMotocycleFailure: (state) => {
      state.singleMotocycle.isFetching = false;
      state.singleMotocycle.error = true;
    },
    deleteMotocycleStart: (state) => {
      state.motocycles.isFetching = true;
      state.motocycles.error = false;
    },
    deleteMotocycleSuccess: (state, action) => {
      state.motocycles.isFetching = false;
      state.motocycles.allMotocycles = state.motocycles.allMotocycles.filter(
        (item) => item.id !== action.payload
      );
      state.motocycles.error = false;
    },
    deleteMotocycleFailure: (state) => {
      state.motocycles.isFetching = false;
      state.motocycles.error = true;
    },
  },
});

export const {
  getMotocyclesStart,
  getMotocyclesSuccess,
  getMotocyclesFailure,
  getSingleMotocycleStart,
  getSingleMotocycleSuccess,
  getSingleMotocycleFailure,
  updateMotocycleStart,
  updateMotocycleSuccess,
  updateMotocycleFailure,
  deleteMotocycleStart,
  deleteMotocycleSuccess,
  deleteMotocycleFailure,
} = motocycleSlice.actions;

export default motocycleSlice.reducer;
