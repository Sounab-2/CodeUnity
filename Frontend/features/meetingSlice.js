// meetingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  meetId: null,
  meetName : null,
};

const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
    setMeetingId: (state, action) => {
      state.meetId = action.payload;
    },
    setMeetingName: (state, action) => {
        state.meetName = action.payload;
      },
    
  },
});

export const { setMeetingId , setMeetingName} = meetingSlice.actions;
export const selectMeetingId = (state) => state.meeting.meetId;
export const selectMeetingName = (state) => state.meeting.meetName;

export default meetingSlice.reducer;