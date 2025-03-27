import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: true,
  isUserLoggedIn: false,
  token: "",
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      state.isUserLoggedIn = true;
    },
    removeUser: (state) => {
      state.user = null;
      state.token = "";
      state.isLoading = true;
      state.isUserLoggedIn = false;
    },
  },
});

export const AuthReducer = authReducer.reducer;
export const { setUser, removeUser } = authReducer.actions;
