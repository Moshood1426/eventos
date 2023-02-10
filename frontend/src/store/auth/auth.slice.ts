import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: token ? JSON.parse(token) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const selectToken = (state: RootState) => state.auth.token

export const authActions = authSlice.actions;
export default authSlice.reducer;
