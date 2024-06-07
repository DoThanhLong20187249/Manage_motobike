import { createSlice } from "@reduxjs/toolkit";

const checkIssueSlice = createSlice({
  name: "report",
  initialState: {
    reports: {
      data: [],
      isFetching: false,
      error: false,
    },
    information: {
      data: null,
      isFetching: false,
      error: false,
    },
    singleReport: {
      data: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getAllReportStart: (state) => {
      state.reports.isFetching = true;
      state.reports.error = false;
    },
    getAllReportSuccess: (state, action) => {
      state.reports.isFetching = false;
      state.reports.data = action.payload;
      state.reports.error = false;
    },
    getAllReportFailure: (state) => {
      state.reports.isFetching = false;
      state.reports.error = true;
    },
    getInformationByIDStart: (state) => {
      state.information.isFetching = true;
      state.information.error = false;
    },
    getInformationByIDSuccess: (state, action) => {
      state.information.isFetching = false;
      state.information.data = action.payload;
      state.information.error = false;
    },
    getInformationByIDFailure: (state) => {
      state.information.isFetching = false;
      state.information.error = true;
    },
    resetInformation: (state) => {
      state.information.data = null;
    },
    deleteCheckIssueStart: (state) => {
      state.reports.isFetching = true;
      state.reports.error = false;
    },
    deleteCheckIssueSuccess: (state, action) => {
      state.reports.isFetching = false;
      state.reports.data = state.reports.data.filter(
        (item) => item.id !== action.payload
      );
      state.reports.error = false;
    },
    deleteCheckIssueFailure: (state) => {
      state.reports.isFetching = false;
      state.reports.error = true;
    },
    getSingReportStart: (state) => {
      state.singleReport.isFetching = true;
      state.singleReport.error = false;
    },
    getSingReportSuccess: (state, action) => {
      state.singleReport.isFetching = false;
      state.singleReport.data = action.payload;
      state.singleReport.error = false;
    },
    getSingReportFailure: (state) => {
      state.singleReport.isFetching = false;
      state.singleReport.error = true;
    },
  },
});

export const {
  getAllReportStart,
  getAllReportSuccess,
  getAllReportFailure,
  getInformationByIDStart,
  getInformationByIDSuccess,
  getInformationByIDFailure,
  resetInformation,
  deleteCheckIssueStart,
  deleteCheckIssueSuccess,
  deleteCheckIssueFailure,
  getSingReportStart,
  getSingReportSuccess,
  getSingReportFailure,
} = checkIssueSlice.actions;
export default checkIssueSlice.reducer;
