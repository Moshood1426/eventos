import { authActions } from "./auth.slice";
import { generalUIActions } from "../generalUI/generalUI.slice";
import axios from "axios";
import authFetch, { handleAxiosError } from "../axios";
import { User } from "../types/types";
import { invalidAction } from "../generalUI/generalUI.actions";
import { eventActions } from "../event/event.slice";
import { salesActions } from "../sales/sales.slice";

interface LoginUserResponse {
  name: string;
  email: string;
  id: number;
  role: "consumer" | "creator";
  token: string;
}

//login user
const loginUser = (userInfo: { email: string; password: string }) => {
  return async (dispatch: any) => {
    dispatch(generalUIActions.isLoadingStarts());
    try {
      const { data } = await axios.post<LoginUserResponse>(
        "/api/v1/auth/login",
        {
          ...userInfo,
        }
      );

      dispatch(generalUIActions.isLoadingCompleted());
      dispatch(authActions.login(data));

      addUserToLocalStorage(
        { id: data.id, role: data.role, name: data.name, email: data.email },
        data.token
      );
    } catch (error) {
      const result = handleAxiosError(error);
      dispatch(invalidAction(result.message));
    }
  };
};

//register user
const registerUser = (userInfo: {
  email: string;
  password: string;
  name: string;
  role: "consumer" | "creator";
}) => {
  return async (dispatch: any) => {
    dispatch(generalUIActions.isLoadingStarts());
    try {
      const { data } = await axios.post<LoginUserResponse>(
        "/api/v1/auth/register",
        {
          ...userInfo,
        }
      );

      dispatch(generalUIActions.isLoadingCompleted());
      dispatch(authActions.login(data));

      addUserToLocalStorage(
        { id: data.id, role: data.role, name: data.name, email: data.email },
        data.token
      );
    } catch (error) {
      const result = handleAxiosError(error);
      dispatch(invalidAction(result.message));
    }
  };
};

//update user
const updateUser = (userUpdate: { email: string; name: string }) => {
  return async (dispatch: any) => {
    dispatch(generalUIActions.isLoadingStarts());
    try {
      const { data } = await authFetch.patch<LoginUserResponse>(
        "/auth/update-user",
        {
          ...userUpdate,
        }
      );

      dispatch(generalUIActions.isLoadingCompleted("User profile updated"));
      dispatch(authActions.login(data));

      addUserToLocalStorage(
        { id: data.id, role: data.role, name: data.name, email: data.email },
        data.token
      );

      setTimeout(() => {
        dispatch(generalUIActions.resetShowAlert());
      }, 3000);
    } catch (error) {
      const result = handleAxiosError(error);
      dispatch(invalidAction(result.message));
    }
  };
};

//update user password
const updateUserPassword = (userPasswords: {
  oldPassword: string;
  newPassword: string;
}) => {
  return async (dispatch: any) => {
    dispatch(generalUIActions.isLoadingStarts());
    try {
      const { data } = await authFetch.patch<LoginUserResponse>(
        "/auth/update-password",
        {
          ...userPasswords,
        }
      );

      dispatch(
        generalUIActions.isLoadingCompleted("User password succesfully updated")
      );
      dispatch(authActions.login(data));

      addUserToLocalStorage(
        { id: data.id, role: data.role, name: data.name, email: data.email },
        data.token
      );

      setTimeout(() => {
        dispatch(generalUIActions.resetShowAlert());
      }, 3000);
    } catch (error) {
      const result = handleAxiosError(error);
      dispatch(invalidAction(result.message));
    }
  };
};

const signOut = () => {
  return (dispatch: any) => {
    dispatch(authActions.logoutUser());
    dispatch(eventActions.resetEventState());
    dispatch(salesActions.resetSalesState());
    dispatch(generalUIActions.resetUIState());
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
};

const addUserToLocalStorage = (user: User, token: string) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

const { toggleClientIsUser } = authActions;

export {
  loginUser,
  registerUser,
  toggleClientIsUser,
  updateUser,
  updateUserPassword,
  signOut,
};
