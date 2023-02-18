import { eventActions } from "./event.slice";
import { generalUIActions } from "../generalUI/generalUI.slice";
import axios from "axios";
import authFetch, { handleAxiosError } from "../axios";
import { EventInst } from "../types/types";
import { invalidAction } from "../generalUI/generalUI.actions";

export const createEvent = (formData: HTMLFormElement) => {
  return async (dispatch: any) => {
    dispatch(generalUIActions.isLoadingStarts());
    try {
      const { data } = await authFetch.post<EventInst>("/event", formData);
      console.log(data);

      dispatch(generalUIActions.isLoadingCompleted());
    } catch (error) {
      console.log(error);
      const result = handleAxiosError(error);
      dispatch(invalidAction(result.message));
    }
  };
};
