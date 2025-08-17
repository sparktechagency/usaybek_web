import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";

export const videosApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    HomeVideos: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/home-video",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.videos],
      transformResponse: (response: any, meta: any) => {
        return {
          data: response.data.data,
          meta,
        };
      },
    }),
    Categories: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/categories",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.categories],
      transformResponse: (response: any) => {
        return {
          data: response.data.data
        };
      },
    }),
    VideosDetails: build.query({
      query: (id: string) => ({
        url: `/videos/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.sinlgeVideo],
      transformResponse: (response: any) => {
        return response.data
      },
    }),
    RelatedVideos: build.query({
      query: ({ id, params}: { id: string; params?: Record<string, any> }) => ({
        url: `/get-related-video/${id}`,
        method: "GET",
         params,
      }),
      providesTags: [tagTypes.relatedVideos],
      transformResponse: (response: any) => {
        return buildResponse(response?.data)
      },
    }),
     storeReport: build.mutation({
      query: (data) => ({
        url: "/add-report",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
    }),
  }),
});

export const {
  useHomeVideosQuery,
  useCategoriesQuery,
  useRelatedVideosQuery,
  useVideosDetailsQuery,
  useStoreReportMutation
} = videosApi;
