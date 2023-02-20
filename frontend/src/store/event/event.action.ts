import { eventActions } from "./event.slice";
import { generalUIActions } from "../generalUI/generalUI.slice";
import axios from "axios";
import authFetch, { handleAxiosError } from "../axios";
import { EventInst } from "../types/types";
import { invalidAction } from "../generalUI/generalUI.actions";
import { selectUser } from "../auth/auth.slice";
import store from "..";

export const createEvent = (formData: HTMLFormElement) => {
  return async (dispatch: any) => {
    dispatch(generalUIActions.isLoadingStarts());
    try {
      const { data } = await authFetch.post<EventInst>("/event", formData);

      if (!data.createdBy) {
        data.createdBy = selectUser(store.getState())!.id;
      }

      dispatch(generalUIActions.isLoadingCompleted());
      dispatch(eventActions.addSingleEvent(data));

      localStorage.setItem("lastSingleEventId", JSON.stringify(data.id));
      return true;
    } catch (error) {
      const result = handleAxiosError(error);
      dispatch(invalidAction(result.message));
      return false;
    }
  };
};

export const getAllEvents = () => {
  return async (dispatch: any) => {
    dispatch(generalUIActions.isLoadingStarts());
    try {
      const { data } = await authFetch.get<EventInst[]>("/event");

      dispatch(eventActions.getAllEvents(data));
      dispatch(generalUIActions.isLoadingCompleted());
    } catch (error) {
      const result = handleAxiosError(error);
      dispatch(invalidAction(result.message));
    }
  };
};

export const getSingleEvent = (eventId: number) => {
  return async (dispatch: any) => {};
};
