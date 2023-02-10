import { createSlice } from "@reduxjs/toolkit";

interface GeneralUIState {
  showAlert: boolean;
  alertType: string;
  alertText: string;
  isLoading: boolean;
}

const initialState: GeneralUIState = {
  showAlert: false,
  alertType: "",
  alertText: "",
  isLoading: false,
};

const generalUISlice = createSlice({
  name: "generalUI",
  initialState,
  reducers: {},
});

export const generalUIActions = generalUISlice.actions;
export default generalUISlice.reducer;
