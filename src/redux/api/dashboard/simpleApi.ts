import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userDashboard: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/dashboard",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.userDashboard],
    }),
    getAnalytics: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/analytics",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.userAnalytics],
    }),
  }),
});

export const { useUserDashboardQuery, useGetAnalyticsQuery } = dashboardApi;
