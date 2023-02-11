import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { AuthState, LoginAction } from "../types/types";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState: AuthState = {
  token: token ,
  user: user ? JSON.parse(user) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: LoginAction) {
      const user = {
        email: action.payload.email,
        id: action.payload.id,
      };
      state.user = user;
      state.token = action.payload.token;
    },
  },
});

export const selectToken = (state: RootState) => state.auth.token;

export const authActions = authSlice.actions;
export default authSlice.reducer;
