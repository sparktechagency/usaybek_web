import { baseApi } from "./baseApi";

export const doctorsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllDoctor: build.query({
      query: () => ({
        url: "/doctor",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllDoctorQuery
} = doctorsApi;
