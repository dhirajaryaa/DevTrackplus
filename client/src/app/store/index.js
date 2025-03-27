import { configureStore } from "@reduxjs/toolkit";
import { ApiQuery } from "../api";
import { AuthReducer } from "../auth/authReducer";

export const Store = configureStore({
  reducer: {
    auth: AuthReducer,
    [ApiQuery.reducerPath]: ApiQuery.reducer,
  },
  middleware: (prevMiddleware) => prevMiddleware().concat(ApiQuery.middleware),
});
