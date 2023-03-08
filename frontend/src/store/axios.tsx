import axios from "axios";
import store from ".";
import { signOut } from "./auth/auth.actions";
import { selectToken } from "./auth/auth.slice";
// axios
const authFetch = axios.create({
  baseURL: "/api/v1",
});
// request

authFetch.interceptors.request.use(
  (config) => {
    const token = selectToken(store.getState());
    config.headers["Authorization"] = `Bearer ${token}`;
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
      // store.dispatch(signOut())
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
  console.log(result);
  return result;
};

export default authFetch;
