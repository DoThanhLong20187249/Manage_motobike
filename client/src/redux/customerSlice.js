import {  createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
       customers :{
            allCustomers: [],
            isFetching: false,
            error: false
        },
        singleCustomer: {
            data: null,
            isFetching: false,
            error: false
        },
        addCustomer: {
            isFetching: false,
            error: false,
            data: null
        }
    },
    reducers: {
        getCustomersStart: (state) => {
            state.customers.isFetching = true;
            state.customers.error = false;
        },
        getCustomersSuccess: (state, action) => {
            state.customers.isFetching = false;
            state.customers.allCustomers = action.payload;
            state.customers.error = false;
        },
        getCustomersFailure: (state) => {
            state.customers.isFetching = false;
            state.customers.error = true;
        },
        getSingleCustomerStart: (state) => {
            state.singleCustomer.isFetching = true;
            state.singleCustomer.error = false;
        },
        getSingleCustomerSuccess: (state, action) => {
            state.singleCustomer.isFetching = false;
            state.singleCustomer.data = action.payload;
            state.singleCustomer.error = false;
        },
        getSingleCustomerFailure: (state) => {
            state.singleCustomer.isFetching = false;
            state.singleCustomer.error = true;
        },
        updateSingleCustomerStart: (state) => {
            state.singleCustomer.isFetching = true;
            state.singleCustomer.error = false;
        },
        updateSingleCustomerSuccess: (state) => {
            state.singleCustomer.isFetching = false;
            state.singleCustomer.error = false;
        },
        updateSingleCustomerFailure: (state) => {
            state.singleCustomer.isFetching = false;
            state.singleCustomer.error = true;
        },
        deleteCustomerStart: (state) => {
            state.customers.isFetching = true;
            state.singleCustomer.error = false;
        },
        deleteCustomerSuccess: (state, action) => {
            state.customers.isFetching = false;
            state.customers.allCustomers = state.customers.allCustomers.filter((customer) => customer.id !== action.payload);
            state.customers.error = false;
        },
        deleteCustomerFailure: (state) => {
            state.customers.isFetching = false;
            state.customers.error = true;
        },
        addCustomerStart: (state) => {
            state.addCustomer.isFetching = true;
            state.addCustomer.error = false;
        },
        addCustomerSuccess: (state, action) => {
            state.addCustomer.isFetching = false;
            state.addCustomer.data = action.payload;
            state.addCustomer.error = false;
        },
        addCustomerFailure: (state) => {
            state.addCustomer.isFetching = false;
            state.addCustomer.error = true;
        },
    },
});

export const { getCustomersStart, getCustomersSuccess, getCustomersFailure,
    getSingleCustomerStart, getSingleCustomerSuccess, getSingleCustomerFailure,
    updateSingleCustomerStart, updateSingleCustomerSuccess, updateSingleCustomerFailure,
    deleteCustomerStart, deleteCustomerSuccess, deleteCustomerFailure,
    addCustomerStart, addCustomerSuccess, addCustomerFailure

 } = customerSlice.actions;
export default customerSlice.reducer;