import { createSlice } from "@reduxjs/toolkit";
import { DataFetchedAction } from "../types/types";

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
  reducers: {
    isLoadingStarts(state) {
      state.isLoading = true;
    },
    isLoadingCompleted(state, action: { type: string; payload: string | undefined}) {
      state.isLoading = false;
      if (action.payload) {
        state.alertText = action.payload;
        state.alertType = "success";
        state.showAlert = true;
      }
    },
    invalidAction(state, action: { type: string; payload: string }) {
      state.isLoading = false;
      state.alertText = action.payload;
      state.alertType = "danger";
      state.showAlert = true;
    },
    resetShowAlert(state) {
      state.alertText = "";
      state.alertType = "";
      state.showAlert = false;
    },
    resetUIState(state) {
      state = initialState;
    },
  },
});

export const generalUIActions = generalUISlice.actions;
export default generalUISlice.reducer;
