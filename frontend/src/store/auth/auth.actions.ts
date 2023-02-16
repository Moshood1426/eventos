import { authActions } from "./auth.slice";
import { generalUIActions } from "../generalUI/generalUI.slice";
import axios from "axios";
import { handleAxiosError } from "../axios";
import { User } from "../types/types";
import { invalidAction } from "../generalUI/generalUI.actions";

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

      addUserToLocalStorage(
        { id: data.id, role: data.role, name: data.name },
        data.token
      );
    } catch (error) {
      const result = handleAxiosError(error);
      dispatch(invalidAction(result.message));
    }
  };
};

const registerUser = (userInfo: {
  email: string;
  password: string;
  name: string;
  role: "consumer" | "creator";
}) => {
  return async (dispatch: any) => {
    dispatch(generalUIActions.isLoadingStarts());
    try {
      const { data } = await axios.post<LoginUserResponse>("/auth/register", {
        ...userInfo,
      });

      dispatch(generalUIActions.isLoadingCompleted());
      dispatch(authActions.login(data));

      addUserToLocalStorage(
        { id: data.id, role: data.role, name: data.name },
        data.token
      );
    } catch (error) {
      const result = handleAxiosError(error);
      dispatch(invalidAction(result.message));
    }
  };
};

const addUserToLocalStorage = (user: User, token: string) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

const { toggleClientIsUser } = authActions;

export { loginUser, registerUser, toggleClientIsUser };
