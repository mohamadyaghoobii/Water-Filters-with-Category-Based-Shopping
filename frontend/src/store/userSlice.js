// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload.user || null;
      state.token = action.payload.token || null;
    },
    // Optionally add more reducers for other actions
  },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
