import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { AuthState, LoginAction } from "../types/types";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState: AuthState = {
  token: token,
  user: user ? JSON.parse(user) : null,
  clientIsUser: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: LoginAction) {
      const user = {
        name: action.payload.name,
        role: action.payload.role,
        email: action.payload.email,
        id: action.payload.id,
      };
      state.user = user;
      state.token = action.payload.token;
    },
    toggleClientIsUser(state, action: { type: string; payload: boolean }) {
      state.clientIsUser = action.payload;
    },
    logoutUser(state) {
      state.user = null;
      state.token = null;
      state.clientIsUser = false;
    },
  },
});

export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;

export const authActions = authSlice.actions;
export default authSlice.reducer;
