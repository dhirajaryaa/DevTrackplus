import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { removeUser } from "../auth/authReducer";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});

export const baseQueryReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 500) {
    const newToken = await baseQuery(
      {
        url: "users/refresh-token",
        method: "POST",
      },
      api,
      extraOptions
    );
    if (newToken?.data) {
      console.log("Refresh token geted", newToken?.data);

      // Retry the original request with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log("❌ Refresh token failed. Logging out...");
      api.dispatch(removeUser());
    }
  }
  return result;
};

export const ApiQuery = createApi({
  baseQuery: baseQueryReauth,
  endpoints: (builder) => ({
    getExample: builder.query({
      query: () => "",
    }),
  }),
});
