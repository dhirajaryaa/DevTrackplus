import { configureStore } from "@reduxjs/toolkit";
import { ApiQuery } from "../api";
import { AuthReducer } from "../auth/authReducer";
import { UiReducer } from "../ui/uiReducer";
import { TaskReducer } from "../task/taskReducer";

export const Store = configureStore({
  reducer: {
    auth: AuthReducer,
    tasks: TaskReducer,
    ui:UiReducer,
    [ApiQuery.reducerPath]: ApiQuery.reducer,
  },
  middleware: (prevMiddleware) => prevMiddleware().concat(ApiQuery.middleware),
});
