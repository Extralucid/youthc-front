import { Middleware } from "@reduxjs/toolkit";
import {
  showNotification,
  NotificationType,
} from "../slices/notification.slice";

export const axiosMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  async (action: any) => {
    if (action.type.endsWith("/rejected")) {
      const errorMessage = action.payload?.message || "An error occurred!";

      dispatch(
        showNotification({
          typer: NotificationType.Error,
          content: errorMessage,
        })
      );
    } else if (action.type.endsWith("/fulfilled")) {
      const successMessage = action.payload?.message || "Sucess!";

      dispatch(
        showNotification({
          typer: NotificationType.Success,
          content: successMessage,
        })
      );
    }

    return next(action);
  };