import { createSlice } from "@reduxjs/toolkit";

const categoryIssueSlice = createSlice({
  name: "categoryIssue",
  initialState: {
    categoryIssues: {
      data: [],
      isFeching: false,
      error: false,
    },
    singleCategoryIssue: {
      data: {},
      isFeching: false,
      error: false,
    },
  },
  reducers: {
    getAllCategoryIssueStart: (state) => {
      state.categoryIssues.isFeching = true;
      state.categoryIssues.error = false;
    },
    getAllCategoryIssueSuccess: (state, action) => {
      state.categoryIssues.isFeching = false;
      state.categoryIssues.data = action.payload;
      state.categoryIssues.error = false;
    },
    getAllCategoryIssueFailure: (state) => {
      state.categoryIssues.isFeching = false;
      state.categoryIssues.error = true;
    },
    getSingleCategoryIssueStart: (state) => {
      state.singleCategoryIssue.isFeching = true;
      state.singleCategoryIssue.error = false;
    },
    getSingleCategoryIssueSuccess: (state, action) => {
      state.singleCategoryIssue.isFeching = false;
      state.singleCategoryIssue.data = action.payload;
      state.singleCategoryIssue.error = false;
    },
    getSingleCategoryIssueFailure: (state) => {
      state.singleCategoryIssue.isFeching = false;
      state.singleCategoryIssue.error = true;
    },
    deleteCategoryIssueStart: (state) => {
      state.categoryIssues.isFeching = true;
      state.categoryIssues.error = false;
    },
    deleteCategoryIssueSuccess: (state, action) => {
      state.categoryIssues.isFeching = false;
      state.categoryIssues.data = state.categoryIssues.data.filter(
        (categoryIssue) => categoryIssue.id !== action.payload
      );
      state.categoryIssues.error = false;
    },
    deleteCategoryIssueFailure: (state) => {
      state.categoryIssues.isFeching = false;
      state.categoryIssues.error = true;
    },
  },
});

export const {
  getAllCategoryIssueStart,
  getAllCategoryIssueSuccess,
  getAllCategoryIssueFailure,
  getSingleCategoryIssueStart,
  getSingleCategoryIssueSuccess,
  getSingleCategoryIssueFailure,
  deleteCategoryIssueStart,
  deleteCategoryIssueSuccess,
  deleteCategoryIssueFailure,
} = categoryIssueSlice.actions;
export default categoryIssueSlice.reducer;
