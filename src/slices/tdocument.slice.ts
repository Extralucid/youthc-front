import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance} from "../api/axiosInstance";
import { uriSerialized } from "../utils/uriSerialized";
import { AxiosError } from "axios";



type ErrorResponse = {
  message: string;
};



type TdocumentApiState = {
  status: "idle" | "loading" | "failed";
  TdocumentData: any;
  error: string | null;
};

const initialState: TdocumentApiState = {
  status: "idle",
  TdocumentData: null,
  error: null,
};



export const listTdocuments = createAsyncThunk(
  "listTdocuments",
  async (queryOptions: any, { rejectWithValue }) => {
    try {
        const query = queryOptions ? "?" + uriSerialized(queryOptions) : ""
      const response = await axiosInstance.get(`/tdocument/list-all-tdocuments${query}`);
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

const TdocumentSlice = createSlice({
  name: "Tdocument",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listTdocuments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        listTdocuments.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.TdocumentData = action.payload.data;
          //console.log(state.TdocumentData);
          
        }
      )
      .addCase(listTdocuments.rejected, (state, action) => {
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

export default TdocumentSlice.reducer;


