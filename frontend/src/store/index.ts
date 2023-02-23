import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import generalUIReducer from "./generalUI/generalUI.slice";
import eventReducer from "./event/event.slice"
import salesReducer from "./sales/sales.slice"

const reducers = {
  generalUI: generalUIReducer,
  auth: authReducer,
  event: eventReducer,
  sales: salesReducer
};

const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
