import { baseApi } from "../baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userDashboard: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/dashboard",
        method: "GET",
        params: arg,
      }),
    }),
  }),
});

export const {useUserDashboardQuery} = dashboardApi;
