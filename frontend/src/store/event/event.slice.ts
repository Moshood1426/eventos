import { createSlice } from "@reduxjs/toolkit";
import { EventInst } from "../types/types";

interface InitialState {
  singleEvent: EventInst;
}

const initialState: InitialState = {
  singleEvent: {
    id: 0,
    title: "",
    description: "",
    date: "",
    venue: "",
    location: "",
    price: null,
    host: "",
    imgPath: "",
    category: "",
    capacity: null,
    createdBy: null,
  },
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addSingleEvent(state, action: { type: any; payload: EventInst }) {
      state.singleEvent = action.payload;
    },
  },
});

export const eventActions = eventSlice.actions;
export default eventSlice.reducer;
