import { createSlice } from "@reduxjs/toolkit";
import { EventInst } from "../types/types";

interface InitialState {
  event: EventInst;
}

const initialState: InitialState = {
  event: {
    id: 0,
    title: "",
    description: "",
    date: 0,
    venue: "",
    location: "",
    price: 0,
    host: "",
    imgPath: "",
    category: "",
    capacity: 0,
    createdBy: 0,
  },
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent(state, action: { type: any; payload: EventInst }) {
      state.event = action.payload;
    },
  },
});

export const eventActions = eventSlice.actions;
export default eventSlice.reducer;
