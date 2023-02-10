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
    isLoadingCompleted(state) {
      state.isLoading = false;
    },
    dataFetched(state, action: DataFetchedAction) {
      state.isLoading = false;
      state.alertText = action.payload.alertText;
      state.alertType = action.payload.alertType;
      state.showAlert = action.payload.showAlert;
    },
  },
});

export const generalUIActions = generalUISlice.actions;
export default generalUISlice.reducer;
