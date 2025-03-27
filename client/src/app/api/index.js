import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";




export const ApiQuery = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  endpoints: (builder) => ({
    getExample: builder.query({
      query: () => '',
    }),
  }),
});
