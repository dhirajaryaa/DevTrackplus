import { createSlice } from "@reduxjs/toolkit";

const taskReducer = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    removeTasks: (state) => {
      state.tasks = [];
    },
  },
});

export const TaskReducer = taskReducer.reducer;
export const { setTasks, removeTasks } = taskReducer.actions;
