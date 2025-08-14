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
    singleDelete: build.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.userVideos],
    }),
    bulkDelete: build.mutation({
      query: (data) => ({
        url: "/videos/bulk-delete",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.userVideos],
    }),
  }),
});

export const {
  useUserVideosQuery,
  useBulkDeleteMutation,
  useSingleDeleteMutation,
} = usersVideosApi;
