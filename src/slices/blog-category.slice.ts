import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance} from "../api/axiosInstance";
import { uriSerialized } from "../utils/uriSerialized";
import { AxiosError } from "axios";



type ErrorResponse = {
  message: string;
};



type BlogCategoryApiState = {
  status: "idle" | "loading" | "failed";
  blogCategoryData: any;
  error: string | null;
};

const initialState: BlogCategoryApiState = {
  status: "idle",
  blogCategoryData: null,
  error: null,
};



export const listBlogCategorys = createAsyncThunk(
  "listBlogCategorys",
  async (queryOptions: any, { rejectWithValue }) => {
    try {
        const query = queryOptions ? "?" + uriSerialized(queryOptions) : ""
      const response = await axiosInstance.get(`/blog-category/list-all-categorys${query}`);
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

const blogCategorySlice = createSlice({
  name: "blogCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listBlogCategorys.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        listBlogCategorys.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.blogCategoryData = action.payload.data;
          //console.log(state.blogCategoryData);
          
        }
      )
      .addCase(listBlogCategorys.rejected, (state, action) => {
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

export default blogCategorySlice.reducer;


