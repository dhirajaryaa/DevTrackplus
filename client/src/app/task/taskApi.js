import { ApiQuery } from "../api";

export const TaskApi = ApiQuery.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllTasks: builder.query({
        query: () => {
          return {
            url: "/tasks",
            method: "GET",
          };
        },
        transformResponse: (data) => data?.data,
      }),
      getTask: builder.query({
        query: (taskId) => {
          return {
            url: `/tasks/${taskId}`,
            method: "GET",
          };
        },
        transformResponse: (data) => data?.data,
      }),
    };
  },
});

export const { useGetAllTasksQuery,useGetTaskQuery } = TaskApi;
