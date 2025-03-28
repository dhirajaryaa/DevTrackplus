import { createSlice } from "@reduxjs/toolkit";

const uiReducer = createSlice({
  name: "ui",
  initialState: {
    profileOpen: false,
    isDarkMode: false,
    ActiveTab: "/",
    ActiveTabTitle: "",
  },
  reducers: {
    setProfileOpen: (state) => {
      state.profileOpen = !state.profileOpen;
    },
  },
});

export const UiReducer = uiReducer.reducer;
export const {setProfileOpen} = uiReducer.actions
