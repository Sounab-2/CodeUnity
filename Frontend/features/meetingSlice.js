import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    meetId : null,
};
const meetingSlice = createSlice({
    name : "meetId",
    initialState,
    reducers :{
        setMeetingId : (state , action) =>{
            state.meetId=action,payload;
        },

    },
});

export const { setMeetingId } = meetingSlice.actions;
export const selectMeetingId = (state) => state.meeting.meetingId;

export default meetingSlice.reducer;

