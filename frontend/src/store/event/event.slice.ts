import { createSlice } from "@reduxjs/toolkit";
import { EventInst } from "../types/types";

interface InitialState {
  singleEvent: EventInst;
  allEvents: EventInst[]
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
  allEvents: []
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addSingleEvent(state, action: { type: any; payload: EventInst }) {
      state.singleEvent = action.payload;
    },
    getAllEvents(state, action: {type: string, payload: EventInst[]}) {
      state.allEvents = action.payload
    }
  },
});

export const eventActions = eventSlice.actions;
export default eventSlice.reducer;
