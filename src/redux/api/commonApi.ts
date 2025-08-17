import { tagTypes } from "@/redux/tag-types";
import { buildResponse } from "@/lib";
import { baseApi } from "./baseApi";
export const commonApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStates: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/states",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.states],
      transformResponse: (res: any) => {
        return res?.data;
      },
    }),
    getCities: build.query({
      query: (id: string) => ({
        url: `/cities/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.cities],
      transformResponse: (res: any) => {
        return res?.data;
      },
    }),
  }),
});

export const { useGetStatesQuery, useGetCitiesQuery } = commonApi;
