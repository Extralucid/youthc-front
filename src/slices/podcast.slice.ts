import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance} from "../api/axiosInstance";
import { uriSerialized } from "../utils/uriSerialized";
import { AxiosError } from "axios";



type ErrorResponse = {
  message: string;
};



type PodcastApiState = {
  status: "idle" | "loading" | "failed";
  podcastData: any;
  error: string | null;
};

const initialState: PodcastApiState = {
  status: "idle",
  podcastData: null,
  error: null,
};



export const listPodcasts = createAsyncThunk(
  "listPodcasts",
  async (queryOptions: any, { rejectWithValue }) => {
    try {
        const query = queryOptions ? "?" + uriSerialized(queryOptions) : ""
      const response = await axiosInstance.get(`/podcast/list-all-podcasts${query}`);
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

const podcastSlice = createSlice({
  name: "podcast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listPodcasts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        listPodcasts.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.podcastData = action.payload.data;
          //console.log(state.podcastData);
          
        }
      )
      .addCase(listPodcasts.rejected, (state, action) => {
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

export default podcastSlice.reducer;


