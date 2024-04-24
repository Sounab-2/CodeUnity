import { configureStore } from "@reduxjs/toolkit";
import userReducer  from "./features/userSlice";
import meetingReducer from './features/meetingSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        meeting: meetingReducer,
    }
})