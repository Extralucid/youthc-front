import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance} from "../api/axiosInstance";
import { uriSerialized } from "../utils/uriSerialized";
import { AxiosError } from "axios";



type ErrorResponse = {
  message: string;
};



type PostApiState = {
  status: "idle" | "loading" | "failed";
  postData: any;
  error: string | null;
};

const initialState: PostApiState = {
  status: "idle",
  postData: null,
  error: null,
};



export const listPosts = createAsyncThunk(
  "listPosts",
  async (queryOptions: any, { rejectWithValue }) => {
    try {
        const query = queryOptions ? "?" + uriSerialized(queryOptions) : ""
      const response = await axiosInstance.get(`/post/list-all-posts${query}`);
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

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        listPosts.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.postData = action.payload.data;
          //console.log(state.postData);
          
        }
      )
      .addCase(listPosts.rejected, (state, action) => {
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

export default postSlice.reducer;


