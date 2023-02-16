import { createSlice } from "@reduxjs/toolkit";

const initialState = {

}

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {

    }
})

export const eventActions = eventSlice.actions
export default eventSlice.reducer