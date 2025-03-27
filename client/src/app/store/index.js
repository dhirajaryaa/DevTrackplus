import { configureStore } from "@reduxjs/toolkit";
import { ApiQuery } from "../api";

export const Store = configureStore({
  reducer: {
    [ApiQuery.reducerPath]: ApiQuery.reducer,
  },
  middleware: (prevMiddleware) => prevMiddleware().concat(ApiQuery.middleware),
});
