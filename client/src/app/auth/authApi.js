import { ApiQuery } from "../api";

export const AuthApi = ApiQuery.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => {
        return { url: "/users/register", method: "POST", body: userData };
      },
      transformResponse: (data) => data?.data,
    }),
    loginUser: builder.mutation({
      query: (userData) => {
        return { url: "/users/login", method: "POST", body: userData };
      },
      transformResponse: (data) => data?.data,
    }),
    logoutUser: builder.mutation({
      query: () => {
        return { url: "/users/logout", method: "POST"};
      },
      transformResponse: (data) => data?.data,
    }),
  }),
});

export const { useLoginUserMutation,useRegisterUserMutation,useLogoutUserMutation } = AuthApi;
