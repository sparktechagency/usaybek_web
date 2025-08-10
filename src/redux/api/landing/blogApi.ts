import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/blogs",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.blogs],
      transformResponse: (response: any, meta: any) => {
        return {
          data: response.data.data,
          meta,
        };
      },
    }),
    singleBlog: build.query({
      query: (id: string) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.singleBlog],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetBlogsQuery, useSingleBlogQuery } = blogApi;
