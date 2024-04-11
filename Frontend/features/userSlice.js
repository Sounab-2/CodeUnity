import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  username: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  } 
}); 

export const { setUser, setLoading, logout,setUsername} = userSlice.actions;
export default userSlice.reducer;
