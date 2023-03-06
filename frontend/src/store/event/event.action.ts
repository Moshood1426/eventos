import { eventActions, selectAllEvents, selectFavEvents } from "./event.slice";
import { generalUIActions } from "../generalUI/generalUI.slice";
import axios from "axios";
import authFetch, { handleAxiosError } from "../axios";
import { EventInst } from "../types/types";
import { invalidAction } from "../generalUI/generalUI.actions";
import { selectUser } from "../auth/auth.slice";
import store from "..";
import moment from "moment";
import { configureURL } from "../../utils/configureURL";

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
      return data.id;
    } catch (error) {
      const result = handleAxiosError(error);
      dispatch(invalidAction(result.message));
      return false;
    }
  };
};

export const getAllEvents = (filterObj?: {
  price: number;
  category: string;
  title: string;
  date: string;
}) => {
  return async (dispatch: any) => {
    dispatch(generalUIActions.isLoadingStarts());
    const user = selectUser(store.getState());
    const userId = user?.id;
    let url = `/event?userId=${userId ? userId : ""}`;
    if (filterObj) {
     url = configureURL(url, filterObj);
    }

    try {
      const { data } = await authFetch.get<EventInst[]>(url);

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

export const getUserEvents = () => {
  return async (dispatch: any) => {
    dispatch(generalUIActions.isLoadingStarts());
    try {
      const { data } = await authFetch.get<EventInst[]>("/event/user");

      dispatch(eventActions.getUserEvents(data));
      dispatch(generalUIActions.isLoadingCompleted());
    } catch (error) {
      const result = handleAxiosError(error);
      dispatch(invalidAction(result.message));
    }
  };
};

export const editEvent = (formData: HTMLFormElement, eventId: number) => {
  return async (dispatch: any) => {
    dispatch(generalUIActions.isLoadingStarts());
    try {
      const { data } = await authFetch.patch<EventInst>(
        `/event/${eventId}`,
        formData
      );

      if (!data.createdBy) {
        data.createdBy = selectUser(store.getState())!.id;
      }

      dispatch(generalUIActions.isLoadingCompleted());
      dispatch(eventActions.addSingleEvent(data));

      localStorage.setItem("lastSingleEventId", JSON.stringify(data.id));
      return data.id;
    } catch (error) {
      const result = handleAxiosError(error);
      dispatch(invalidAction(result.message));
      return false;
    }
  };
};

export const deleteEvent = (eventId: number) => {
  return async (dispatch: any) => {
    dispatch(generalUIActions.isLoadingStarts());
    try {
      const { data } = await authFetch.delete<{ msg: string }>(
        `/event/${eventId}`
      );
      dispatch(generalUIActions.isLoadingCompleted());
      return true;
    } catch (error) {
      const result = handleAxiosError(error);
      dispatch(invalidAction(result.message));
      return false;
    }
  };
};

export const setEditEvent = eventActions.setEditEvent
