import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import generalUIReducer from "./generalUI/generalUI.slice";
import eventReducer from "./event/event.slice"

const reducers = {
  generalUI: generalUIReducer,
  auth: authReducer,
  event: eventReducer
};

const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
