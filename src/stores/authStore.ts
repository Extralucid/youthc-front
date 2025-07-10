import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth.slice";
import userReducer from "../slices/user.slice";
import notificationReducer from "../slices/notification.slice";
import ressourceReducer from '../slices/ressource.slice';
import { axiosMiddleware } from "../api/middleware";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    ressource: ressourceReducer,
    notification: notificationReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(axiosMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;