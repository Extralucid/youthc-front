import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance} from "../api/axiosInstance";
import { uriSerialized } from "../utils/uriSerialized";
import { AxiosError } from "axios";



type ErrorResponse = {
  message: string;
};



type BookCategoryApiState = {
  status: "idle" | "loading" | "failed";
  bookCategoryData: any;
  error: string | null;
};

const initialState: BookCategoryApiState = {
  status: "idle",
  bookCategoryData: null,
  error: null,
};



export const listBookCategorys = createAsyncThunk(
  "listBookCategorys",
  async (queryOptions: any, { rejectWithValue }) => {
    try {
        const query = queryOptions ? "?" + uriSerialized(queryOptions) : ""
      const response = await axiosInstance.get(`/book-category/list-all-bookCategorys${query}`);
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

const bookCategorySlice = createSlice({
  name: "bookCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listBookCategorys.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        listBookCategorys.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.bookCategoryData = action.payload.data;
          //console.log(state.bookCategoryData);
          
        }
      )
      .addCase(listBookCategorys.rejected, (state, action) => {
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

export default bookCategorySlice.reducer;


