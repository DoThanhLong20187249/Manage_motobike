import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: {
      allEmployees: null,
      isFetching: false,
      error: false,
    },
    addEmployee: { 
      isFetching: false,
      error: false,
      message: null,
    },
    singleEmployee: {
      isFetching: false,
      error: false,
      data: null,
      message: null,
    }
  },
  reducers: {
    getEmployeesStart: (state) => {
      state.employees.isFetching = true;
      state.employees.error = false;
    },
    getEmployeesSuccess: (state, action) => {
      state.employees.isFetching = false;
      state.employees.allEmployees = action.payload;
      state.employees.error = false;
    },
    getEmployeesFailure: (state) => {
      state.employees.isFetching = false;
      state.employees.error = true;
    },
    addEmployeeStart: (state) => {
      state.addEmployee.isFetching = true;
      state.addEmployee.error = false;
    },
    addEmployeeSuccess: (state, action) => {
      state.addEmployee.isFetching = false;
      state.addEmployee.error = false;
      state.addEmployee.message = action.payload;
    },
    addEmployeeFailure: (state,action) => {
      state.addEmployee.isFetching = false;
      state.addEmployee.error = true;
      state.addEmployee.message = action.payload;
    },
    getSingleEmployeeStart: (state) => {
      state.singleEmployee.isFetching = true;
      state.singleEmployee.error = false;
    },
    getSingleEmployeeSuccess: (state, action) => {
      state.singleEmployee.isFetching = false;
      state.singleEmployee.data = action.payload;
      state.singleEmployee.error = false;
    },
    getSingleEmployeeFailure: (state, action) => {
      state.singleEmployee.isFetching = false;
      state.singleEmployee.error = true;
      state.singleEmployee.message = action.payload;
    },
    updateSingleEmployeeStart: (state) => {
      state.singleEmployee.isFetching = true;
      state.singleEmployee.error = false;
    },
    updateSingleEmployeeSuccess: (state, action) => {
      state.singleEmployee.isFetching = false;
      state.singleEmployee.data = action.payload;
      state.singleEmployee.error = false;
    },
    updateSingleEmployeeFailure: (state, action) => {
      state.singleEmployee.isFetching = false;
      state.singleEmployee.error = true;
      state.singleEmployee.message = action.payload;
    },

  },
});

export const {
  getEmployeesStart,
  getEmployeesSuccess,
  getEmployeesFailure,
  addEmployeeStart,
  addEmployeeSuccess,
  addEmployeeFailure,
  getSingleEmployeeStart,
  getSingleEmployeeSuccess,
  getSingleEmployeeFailure,
  updateSingleEmployeeStart,
  updateSingleEmployeeSuccess,
  updateSingleEmployeeFailure,
} = employeeSlice.actions;
export default employeeSlice.reducer;
