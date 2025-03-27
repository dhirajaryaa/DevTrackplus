import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isUserLoggedIn: false,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isUserLoggedIn = true;
    },
    removeUser: (state) => {
      state.user = null;
      state.isUserLoggedIn = false;
    },
  },
});

export const AuthReducer = authReducer.reducer;
export const { setUser, removeUser } = authReducer.actions;
