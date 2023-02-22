import { eventActions, selectAllEvents, selectFavEvents } from "./event.slice";
import { generalUIActions } from "../generalUI/generalUI.slice";
import axios from "axios";
import authFetch, { handleAxiosError } from "../axios";
import { EventInst } from "../types/types";
import { invalidAction } from "../generalUI/generalUI.actions";
import { selectUser } from "../auth/auth.slice";
import store from "..";
import moment from "moment";

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
    const user = selectUser(store.getState());
    const userId = user?.id;
    try {
      const { data } = await authFetch.get<EventInst[]>(
        `/event?userId=${userId}`
      );

      const result = data.map((item) => {
        if (item.date === "1") {
          return { ...item, date: moment().format("MMMM Do YYYY, h:mm:ss a") };
        } else {
          return item;
        }
      });
      dispatch(eventActions.getAllEvents(result));
      dispatch(generalUIActions.isLoadingCompleted());
    } catch (error) {
      const result = handleAxiosError(error);
      dispatch(invalidAction(result.message));
    }
  };
};

export const getSingleEvent = (eventId: number) => {
  return async (dispatch: any) => {
    dispatch(generalUIActions.isLoadingStarts());
    try {
      const { data } = await authFetch.get<EventInst>(`/event/${eventId}`);

      dispatch(eventActions.addSingleEvent(data));
      dispatch(generalUIActions.isLoadingCompleted());
    } catch (error) {
      const result = handleAxiosError(error);
      dispatch(invalidAction(result.message));
    }
  };
};

export const getFavEvents = () => {
  return async (dispatch: any) => {
    dispatch(generalUIActions.isLoadingStarts());
    try {
      const { data } = await authFetch.get<EventInst[]>(
        "/event/get-fav-events"
      );

      dispatch(eventActions.getUserFavEvents(data));
      dispatch(generalUIActions.isLoadingCompleted());
    } catch (error) {
      const result = handleAxiosError(error);
      dispatch(invalidAction(result.message));
    }
  };
};

export const addEventAsFav = (eventId: number) => {
  return async (dispatch: any) => {
    try {
      const { data } = await authFetch.patch<EventInst[]>("/event/add-to-fav", {
        eventId,
      });
      dispatch(eventActions.getUserFavEvents(data));

      const allEvents = selectAllEvents(store.getState());

      if (allEvents) {
        const allEventResult = allEvents.map((item) =>
          item.id === eventId ? { ...item, isFavorite: true } : item
        );
        dispatch(eventActions.getAllEvents(allEventResult));
      }
    } catch (error) {
      const result = handleAxiosError(error);
      dispatch(invalidAction(result.message));
    }
  };
};

export const removeEventFromFav = (eventId: number) => {
  return async (dispatch: any) => {
    try {
      const { data } = await authFetch.patch<EventInst[]>(
        "/event/remove-from-fav",
        {
          eventId,
        }
      );
      dispatch(eventActions.getUserFavEvents(data));

      const allEvents = selectAllEvents(store.getState());
      if (allEvents) {
        const allEventResult = allEvents.map((item) =>
          item.id === eventId ? { ...item, isFavorite: false } : item
        );
        dispatch(eventActions.getAllEvents(allEventResult));
      }
    } catch (error) {
      const result = handleAxiosError(error);
      dispatch(invalidAction(result.message));
    }
  };
};
