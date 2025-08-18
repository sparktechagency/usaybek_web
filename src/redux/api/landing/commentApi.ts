import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getComment: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/comments",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.allcomment],
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    storeComments: build.mutation({
      query: (data) => ({
        url: "/comments",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.allcomment],
    }),
    toggleReaction: build.mutation({
      query: (data) => ({
        url: "/add-remove-comment-reaction",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.allcomment],
    }),
    getReplay: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/replies",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.allReplay],
      transformResponse: (response: any) => {
        return response?.data;
      },
    }),
    storeReplay: build.mutation({
      query: (data) => ({
        url: "/replies",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.allReplay],
    }),
    toggleReplayReaction: build.mutation({
      query: (data) => ({
        url: "/add-remove-reply-reaction",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.allReplay],
    }),
  }),
});

export const {
  useGetCommentQuery,
  useStoreCommentsMutation,
  useToggleReactionMutation,
  useGetReplayQuery,
  useToggleReplayReactionMutation,
  useStoreReplayMutation
} = commentApi;
