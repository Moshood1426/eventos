import { createSlice } from "@reduxjs/toolkit";
import { SingleOrder, SingleTicket } from "../types/types";

interface initialStateInterface {
  order: SingleOrder;
  tickets: SingleTicket[];
}

const initialState: initialStateInterface = {
  order: {
    numOfTickets: null,
    totalOrderAmount: 0,
    clientSecret: "",
    paymentIntentId: "",
    id: 0,
  },
  tickets: [],
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    addOrder(state, action: { type: string; payload: SingleOrder }) {
      state.order = action.payload;
    },
    getUserTickets(state, action: { type: string; payload: SingleTicket[] }) {
      state.tickets = action.payload;
    },
    resetSalesState(state) {
      state = initialState;
    },
  },
});

export const salesActions = salesSlice.actions;
export default salesSlice.reducer;
