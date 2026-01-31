import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";


export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCategory: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/categories",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.categoriesAdmin],
      transformResponse: (res: any) => {
        const { current_page, per_page, total, data } = res?.data;
        const categories = data || [];
        const sortedCategories = categories?.sort((a: any, b: any) =>
          a?.name?.localeCompare(b?.name, undefined, { sensitivity: "base" }),
        );
        return {
          data: sortedCategories,
          meta: {
            current_page,
            per_page,
            total,
          },
        };
      },
    }),

    singleCategory: build.query({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.singleCategory],
    }),
    storeCategory: build.mutation({
      query: (data) => ({
        url: "/admin/categories",
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.categoriesAdmin],
    }),
    updateCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `/admin/categories/${id}`,
        method: "POST",
        ContentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.categoriesAdmin],
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.categoriesAdmin],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useStoreCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useSingleCategoryQuery,
} = categoryApi;
