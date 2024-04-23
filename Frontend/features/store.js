import { configureStore } from "@reduxjs/toolkit";
import meetingReducer from './meetingSlice';

export default configureStore({
    reducer: {
      meeting: meetingReducer,
      // other reducers...
    },
  });