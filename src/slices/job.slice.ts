import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance} from "../api/axiosInstance";
import { uriSerialized } from "../utils/uriSerialized";
import { AxiosError } from "axios";



type ErrorResponse = {
  message: string;
};



type JobApiState = {
  status: "idle" | "loading" | "failed";
  jobData: any;
  error: string | null;
};

const initialState: JobApiState = {
  status: "idle",
  jobData: null,
  error: null,
};



export const listJobs = createAsyncThunk(
  "listJobs",
  async (queryOptions: any, { rejectWithValue }) => {
    try {
        const query = queryOptions ? "?" + uriSerialized(queryOptions) : ""
      const response = await axiosInstance.get(`/job/list-all-jobs${query}`);
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

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listJobs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        listJobs.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.jobData = action.payload.data;
          //console.log(state.jobData);
          
        }
      )
      .addCase(listJobs.rejected, (state, action) => {
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

export default jobSlice.reducer;


