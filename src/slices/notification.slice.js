import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  content: "",
  typer: "success", // Using string directly instead of enum
};

//const toaster = useToaster();

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
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