import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance} from "../api/axiosInstance";
import { uriSerialized } from "../utils/uriSerialized";
import { AxiosError } from "axios";



type ErrorResponse = {
  message: string;
};



type TagApiState = {
  status: "idle" | "loading" | "failed";
  tagData: any;
  error: string | null;
};

const initialState: TagApiState = {
  status: "idle",
  tagData: null,
  error: null,
};



export const listTags = createAsyncThunk(
  "listTags",
  async (queryOptions: any, { rejectWithValue }) => {
    try {
        const query = queryOptions ? "?" + uriSerialized(queryOptions) : ""
      const response = await axiosInstance.get(`/tag/list-all-tags${query}`);
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

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listTags.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        listTags.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.tagData = action.payload.data;
          //console.log(state.tagData);
          
        }
      )
      .addCase(listTags.rejected, (state, action) => {
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

export default tagSlice.reducer;


