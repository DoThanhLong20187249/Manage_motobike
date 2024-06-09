import { createSlice } from '@reduxjs/toolkit';

const informationReportDetalsSlice = createSlice({
    name: 'informationReportDetals',
    initialState: {
        data : null,
    },
    reducers: {
        setInformationReportDetals: (state, action) => {
            state.data = action.payload;
        },
        
    },
});

export const { setInformationReportDetals } = informationReportDetalsSlice.actions;
export default informationReportDetalsSlice.reducer;
