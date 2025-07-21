import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance} from "../api/axiosInstance";
import { uriSerialized } from "../utils/uriSerialized";
import { AxiosError } from "axios";



type ErrorResponse = {
  message: string;
};



type TutorialCategoryApiState = {
  status: "idle" | "loading" | "failed";
  tutorialCategoryData: any;
  error: string | null;
};

const initialState: TutorialCategoryApiState = {
  status: "idle",
  tutorialCategoryData: null,
  error: null,
};



export const listTutorialCategorys = createAsyncThunk(
  "listTutorialCategorys",
  async (queryOptions: any, { rejectWithValue }) => {
    try {
        const query = queryOptions ? "?" + uriSerialized(queryOptions) : ""
      const response = await axiosInstance.get(`/tutorial-category/list-all-tutorialCategorys${query}`);
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

const tutorialCategorySlice = createSlice({
  name: "tutorialCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listTutorialCategorys.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        listTutorialCategorys.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.tutorialCategoryData = action.payload.data;
          //console.log(state.tutorialCategoryData);
          
        }
      )
      .addCase(listTutorialCategorys.rejected, (state, action) => {
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

export default tutorialCategorySlice.reducer;


