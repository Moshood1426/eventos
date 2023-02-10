import { authActions } from "./auth.slice";
import { generalUIActions } from "../generalUI/generalUI.slice";
import axios from "axios";
import { handleAxiosError } from "../axios";
import { User } from "../types/types";

interface LoginUserResponse {
  name: string;
  email: string;
  id: number;
  role: "consumer" | "creator";
  token: string;
}

const loginUser = (userInfo: { email: string; password: string }) => {
  return async (dispatch: any) => {
    dispatch(generalUIActions.isLoadingStarts());
    try {
      const { data } = await axios.post<LoginUserResponse>("/auth/login", {
        ...userInfo,
      });

      dispatch(generalUIActions.isLoadingCompleted());
      dispatch(authActions.login(data));

      addUserToLocalStorage({ id: data.id, email: data.email }, data.token);
    } catch (error) {
      const result = handleAxiosError(error);
      const data = {
        showAlert: true,
        alertType: "danger",
        alertText: result.message,
      };
      dispatch(generalUIActions.dataFetched(data));
    }
  };
};

const addUserToLocalStorage = (user: User, token: string) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

export { loginUser };
