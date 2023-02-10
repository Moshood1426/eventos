import axios from "axios";
import store from ".";
import { selectToken } from "./auth/auth.slice";
import { useAppSelector } from "./hooks";

// axios
const authFetch = axios.create({
  baseURL: "/api/v1",
});
// request
const token = selectToken(store.getState())

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

export default authFetch