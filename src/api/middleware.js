import { showNotification } from "../slices/notification.slice";

export const axiosMiddleware = 
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type.endsWith("/rejected")) {
      const errorMessage = action.payload?.message || "An error occurred!";

      dispatch(
        showNotification({
          typer: "error",  // Changed from NotificationType.Error to string
          content: errorMessage,
        })
      );
    } else if (action.type.endsWith("/fulfilled")) {
      const successMessage = action.payload?.message || "Success!";

      dispatch(
        showNotification({
          typer: "success",  // Changed from NotificationType.Success to string
          content: successMessage,
        })
      );
    }

    return next(action);
  };