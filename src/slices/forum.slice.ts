import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance} from "../api/axiosInstance";
import { uriSerialized } from "../utils/uriSerialized";
import { AxiosError } from "axios";



type ErrorResponse = {
  message: string;
};



type ForumApiState = {
  status: "idle" | "loading" | "failed";
  forumData: any;
  error: string | null;
};

const initialState: ForumApiState = {
  status: "idle",
  forumData: null,
  error: null,
};



export const listForums = createAsyncThunk(
  "listForums",
  async (queryOptions: any, { rejectWithValue }) => {
    try {
        const query = queryOptions ? "?" + uriSerialized(queryOptions) : ""
      const response = await axiosInstance.get(`/forum/list-all-forums${query}`);
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

const forumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listForums.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        listForums.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.forumData = action.payload.data;
          //console.log(state.forumData);
          
        }
      )
      .addCase(listForums.rejected, (state, action) => {
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

export default forumSlice.reducer;


