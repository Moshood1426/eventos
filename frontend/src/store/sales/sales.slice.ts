import { createSlice } from "@reduxjs/toolkit";
import { SingleOrder } from "../types/types";

interface initialStateInterface {
  order: SingleOrder;
}

const initialState: initialStateInterface = {
  order: {
    numOfTickets: null,
    totalOrderAmount: 0,
    clientSecret: "",
    paymentIntentId: "",
    id: 0,
  },
};

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    addOrder(state, action: { type: string; payload: SingleOrder }) {
      state.order = action.payload;
    },
  },
});

export const salesActions = salesSlice.actions;
export default salesSlice.reducer;
