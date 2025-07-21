import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance} from "../api/axiosInstance";
import { uriSerialized } from "../utils/uriSerialized";
import { AxiosError } from "axios";



type ErrorResponse = {
  message: string;
};

type ChatApiState = {
  status: "idle" | "loading" | "failed";
  chatData: any;
  error: string | null;
};

const initialState: ChatApiState = {
  status: "idle",
  chatData: null,
  error: null,
};



export const listChats = createAsyncThunk(
  "listChats",
  async (queryOptions: any, { rejectWithValue }) => {
    try {
        const query = queryOptions ? "?" + uriSerialized(queryOptions) : ""
      const response = await axiosInstance.get(`/chat/rooms${query}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        
        return rejectWithValue(errorResponse);
      }
      console.log(error);
      
      throw error;
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listChats.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        listChats.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.chatData = action.payload.data;
          //console.log(state.chatData);
          
        }
      )
      .addCase(listChats.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Login failed";
        } else {
          state.error = action.error.message || "Login failed";
        }
      });

  },
});

export default chatSlice.reducer;


