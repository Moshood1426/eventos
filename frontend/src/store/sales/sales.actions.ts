import authFetch, { handleAxiosError } from "../axios";
import { invalidAction } from "../generalUI/generalUI.actions";
import { generalUIActions } from "../generalUI/generalUI.slice";
import { SingleOrder, SingleTicket } from "../types/types";
import { salesActions } from "./sales.slice";

export const checkout = (eventId: number, quantity: number) => {
  return async (dispatch: any) => {
    dispatch(generalUIActions.isLoadingStarts);
    try {
      const { data } = await authFetch.post<SingleOrder>("/sales/checkout", {
        eventId,
        quantity,
      });

      dispatch(salesActions.addOrder(data));
      dispatch(generalUIActions.isLoadingCompleted());
      return true;
    } catch (error) {
      const result = handleAxiosError(error);
      dispatch(invalidAction(result.message));
      return false;
    }
  };
};

export const getUserTickets = () => {
  return async (dispatch: any) => {
    dispatch(generalUIActions.isLoadingStarts);
    try {
      const { data } = await authFetch.get<SingleTicket[]>("/sales/tickets");

      dispatch(salesActions.getUserTickets(data));
      dispatch(generalUIActions.isLoadingCompleted());
    } catch (error) {
      const result = handleAxiosError(error);
      dispatch(invalidAction(result.message));
    }
  };
};
