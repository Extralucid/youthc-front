import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance} from "../api/axiosInstance";
import { uriSerialized } from "../utils/uriSerialized";
import { AxiosError } from "axios";



type ErrorResponse = {
  message: string;
};



type UserApiState = {
  status: "idle" | "loading" | "failed";
  userData: any;
  error: string | null;
};

const initialState: UserApiState = {
  status: "idle",
  userData: null,
  error: null,
};



export const listUsers = createAsyncThunk(
  "listUsers",
  async (queryOptions: any, { rejectWithValue }) => {
    try {
        const query = queryOptions ? "?" + uriSerialized(queryOptions) : ""
      const response = await axiosInstance.get(`/user/list-all-users${query}`);
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        listUsers.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.userData = action.payload.data;
          //console.log(state.userData);
          
        }
      )
      .addCase(listUsers.rejected, (state, action) => {
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

export default userSlice.reducer;


