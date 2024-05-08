import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: "account",
    initialState: {
        accounts:{
            allAccounts: null,
            isFetching: false,
            error: false
        }
    },
    reducers:{
        getAccountsStart: (state) => {
            state.accounts.isFetching = true;
            state.accounts.error = false;
        },
        getAccountsSuccess: (state, action) => {
            state.accounts.isFetching = false;
            state.accounts.allAccounts = action.payload;
            state.accounts.error = false;
        },
        getAccountsFailure: (state) => {
            state.accounts.isFetching = false;
            state.accounts.error = true;
        },
    },
});

export const { getAccountsStart, getAccountsSuccess, getAccountsFailure } = accountSlice.actions;
export default accountSlice.reducer;