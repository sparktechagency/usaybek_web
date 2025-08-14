import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const usersVideosApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userVideos: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/videos",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.userVideos],
      transformResponse: (res: any) => {
        return buildResponse(res?.data);
      },
    }),
    // getAnalytics: build.query({
    //   query: (arg: Record<string, any>) => ({
    //     url: "/analytics",
    //     method: "GET",
    //     params: arg,
    //   }),
    //   providesTags: [tagTypes.userAnalytics],
    // }),
    // editProfile: build.mutation({
    //   query: (data) => ({
    //     url: "/edit-profile",
    //     method: "POST",
    //     ContentType: "multipart/form-data",
    //     data,
    //   }),
    //   invalidatesTags: [tagTypes.profile],
    // }),
  }),
});

export const { useUserVideosQuery } = usersVideosApi;
