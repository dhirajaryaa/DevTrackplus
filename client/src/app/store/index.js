import { configureStore } from "@reduxjs/toolkit";
import { ApiQuery } from "../api";
import { AuthReducer } from "../auth/authReducer";
import { UiReducer } from "../ui/uiReducer";

export const Store = configureStore({
  reducer: {
    auth: AuthReducer,
    ui:UiReducer,
    [ApiQuery.reducerPath]: ApiQuery.reducer,
  },
  middleware: (prevMiddleware) => prevMiddleware().concat(ApiQuery.middleware),
});
