import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useToaster } from "rsuite";

export enum NotificationType {
  Success = "success",
  Error = "error",
  Warning = "warning",
  Info = "info",
}

type Notification = {
  open: boolean;
  content: string;
  typer: NotificationType;
};

type ShowNotification = Omit<Notification, "open">;

const initialState = {
  open: false,
  content: "",
  typer: NotificationType.Success,
};

//const toaster = useToaster();


const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<ShowNotification>) => {
      state.open = true;
      state.content = action.payload.content;
      state.typer = action.payload.typer;
      //toaster.push(state.content, { duration: 5000, placement: 'topEnd' })
    },
    hideNotification: (state) => {
      state.open = false;
      state.content = "";
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;