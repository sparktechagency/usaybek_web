// import { authKey } from "@/contants";
// import { getLocalStroage, setLocalStroage } from "@/lib/utils";
// import { GenerateAccessToken } from "@/services/auth.services";
// import { ResponseSuccessProps } from "@/types";
import { authKey, getCookie } from "@/lib";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
// instance.defaults.withCredentials =false

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const accessToken = getCookie(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    const { current_page, per_page, total } = response.data.data;
    const responseObject: any = {
      data: response?.data,
      meta: {
        current_page,
        per_page,
        total,
      },
    };
    return responseObject;
  },
  async function (error) {
    return {
      error: {
        data: error.response?.data,
      },
    };
  }
);

export default instance;
