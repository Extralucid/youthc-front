import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance} from "../api/axiosInstance";
import { uriSerialized } from "../utils/uriSerialized";
import { AxiosError } from "axios";



type ErrorResponse = {
  message: string;
};



type RessourceApiState = {
  status: "idle" | "loading" | "failed";
  ressourceData: any;
  error: string | null;
};

const initialState: RessourceApiState = {
  status: "idle",
  ressourceData: null,
  error: null,
};



export const listRessources = createAsyncThunk(
  "listRessources",
  async (queryOptions: any, { rejectWithValue }) => {
    try {
        const query = queryOptions ? "?" + uriSerialized(queryOptions) : ""
      const response = await axiosInstance.get(`/auth/list-all-ressources${query}`);
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

const ressourceSlice = createSlice({
  name: "ressource",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listRessources.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        listRessources.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.ressourceData = action.payload.data;
          //console.log(state.ressourceData);
          
        }
      )
      .addCase(listRessources.rejected, (state, action) => {
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

export default ressourceSlice.reducer;


