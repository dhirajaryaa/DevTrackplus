import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: true,
  isUserLoggedIn: false,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.isUserLoggedIn = true;
    },
    removeUser: (state) => {
      state.user = null;
      state.isLoading = true;
      state.isUserLoggedIn = false;
    },
  },
});

export const AuthReducer = authReducer.reducer;
export const { setUser, removeUser } = authReducer.actions;
