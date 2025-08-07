import { baseApi } from "../baseApi";


export const videosApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    HomeVideos: build.query({
      query: () => ({
        url: "/home-video",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useHomeVideosQuery
} = videosApi;
