import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth.slice";
import notificationReducer from "../slices/notification.slice";
import { axiosMiddleware } from "../api/middleware";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(axiosMiddleware),
});

export default store;