import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance} from "../api/axiosInstance";
import { uriSerialized } from "../utils/uriSerialized";
import { AxiosError } from "axios";



type ErrorResponse = {
  message: string;
};



type TutorialApiState = {
  status: "idle" | "loading" | "failed";
  tutorialData: any;
  error: string | null;
};

const initialState: TutorialApiState = {
  status: "idle",
  tutorialData: null,
  error: null,
};



export const listTutorials = createAsyncThunk(
  "listTutorials",
  async (queryOptions: any, { rejectWithValue }) => {
    try {
        const query = queryOptions ? "?" + uriSerialized(queryOptions) : ""
      const response = await axiosInstance.get(`/tutorial/list-all-tutorials${query}`);
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

const tutorialSlice = createSlice({
  name: "tutorial",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listTutorials.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        listTutorials.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.tutorialData = action.payload.data;
          //console.log(state.tutorialData);
          
        }
      )
      .addCase(listTutorials.rejected, (state, action) => {
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

export default tutorialSlice.reducer;


