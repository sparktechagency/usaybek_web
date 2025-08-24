import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";
import { buildResponse } from "@/lib";


export const reportsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAreport: build.query({
      query: (arg?: Record<string, any>) => ({
        url: "/admin/get-reports",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.reportAdmin],
      transformResponse: (res: any) => {
        const rest = buildResponse(res?.data?.reports);
        return {
          ...rest,
          total_appeals: res?.data?.total_appeals,
        };
      },
    }),
    // getChannelsDetails: build.query({
    //   query: ({ id, arg }: Args) => ({
    //     url: `/channel-details/${id}`,
    //     method: "GET",
    //     params: arg,
    //   }),
    //   providesTags: [tagTypes.channelDetailsAdmin],
    //   transformResponse: (res: any) => {
    //     return res?.data
    //   },
    // }),
    // channelDelete: build.mutation({
    //   query: (id) => ({
    //     url: `/admin/delete-channel/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.getChannels],
    // }),
  }),
});

export const { useGetAreportQuery } = reportsApi;
