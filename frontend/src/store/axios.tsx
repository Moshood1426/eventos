import axios from "axios";
import store from ".";
import { selectToken } from "./auth/auth.slice";

// axios
const authFetch = axios.create({
  baseURL: "/api/v1",
});
// request
const token = selectToken(store.getState());

authFetch.interceptors.request.use(
  (config) => {
    config.headers.common["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// response

authFetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log(error.response)
    if (error.response.status === 401) {
      //   logoutUser();
    }
    return Promise.reject(error);
  }
);

export const handleAxiosError = (error: any): { message: string } => {
  console.log(error);
  let result;
  if (axios.isAxiosError(error)) {
    interface Response {
      message: string;
    }
    result = error.response?.data as Response;
  }
  if (error.special) {
    result = { message: "Something went wrong, try again later" };
  }
  if (!result) {
    result = { message: "An unexpected error occurred" };
  }
  return result;
};

export default authFetch;
