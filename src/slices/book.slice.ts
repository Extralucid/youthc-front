import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance} from "../api/axiosInstance";
import { uriSerialized } from "../utils/uriSerialized";
import { AxiosError } from "axios";



type ErrorResponse = {
  message: string;
};



type BookApiState = {
  status: "idle" | "loading" | "failed";
  bookData: any;
  error: string | null;
};

const initialState: BookApiState = {
  status: "idle",
  bookData: null,
  error: null,
};



export const listBooks = createAsyncThunk(
  "listBooks",
  async (queryOptions: any, { rejectWithValue }) => {
    try {
        const query = queryOptions ? "?" + uriSerialized(queryOptions) : ""
      const response = await axiosInstance.get(`/book/list-all-books${query}`);
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

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listBooks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        listBooks.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.bookData = action.payload.data;
          //console.log(state.bookData);
          
        }
      )
      .addCase(listBooks.rejected, (state, action) => {
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

export default bookSlice.reducer;


