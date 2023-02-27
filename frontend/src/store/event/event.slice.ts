import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { EventInst } from "../types/types";

interface InitialState {
  singleEvent: EventInst;
  allEvents: EventInst[];
  favEvents: EventInst[];
  userEvents: EventInst[];
  tickets: [];
  editEvent: boolean;
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
  allEvents: [],
  favEvents: [],
  tickets: [],
  userEvents: [],
  editEvent: false,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addSingleEvent(state, action: { type: any; payload: EventInst }) {
      state.singleEvent = action.payload;
    },
    getAllEvents(state, action: { type: string; payload: EventInst[] }) {
      state.allEvents = action.payload;
    },
    getUserFavEvents(state, action: { type: string; payload: EventInst[] }) {
      state.favEvents = action.payload;
    },
    resetEventState(state) {
      state = initialState;
    },
    getUserEvents(state, action: { type: string; payload: EventInst[] }) {
      state.userEvents = action.payload;
    },
    setEditEvent(state, action: { type: string; payload: boolean }) {
      state.editEvent = action.payload;
    },
  },
});

export const eventActions = eventSlice.actions;
export const selectFavEvents = (state: RootState) => state.event.favEvents;
export const selectAllEvents = (state: RootState) => state.event.allEvents;
export default eventSlice.reducer;
