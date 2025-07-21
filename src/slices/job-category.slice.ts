import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance} from "../api/axiosInstance";
import { uriSerialized } from "../utils/uriSerialized";
import { AxiosError } from "axios";



type ErrorResponse = {
  message: string;
};



type JobCategoryApiState = {
  status: "idle" | "loading" | "failed";
  jobCategoryData: any;
  error: string | null;
};

const initialState: JobCategoryApiState = {
  status: "idle",
  jobCategoryData: null,
  error: null,
};



export const listJobCategorys = createAsyncThunk(
  "listJobCategorys",
  async (queryOptions: any, { rejectWithValue }) => {
    try {
        const query = queryOptions ? "?" + uriSerialized(queryOptions) : ""
      const response = await axiosInstance.get(`/job-category/list-all-categories${query}`);
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

const jobCategorySlice = createSlice({
  name: "jobCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listJobCategorys.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        listJobCategorys.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.jobCategoryData = action.payload.data;
          //console.log(state.jobCategoryData);
          
        }
      )
      .addCase(listJobCategorys.rejected, (state, action) => {
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

export default jobCategorySlice.reducer;


