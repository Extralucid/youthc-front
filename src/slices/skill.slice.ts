import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance} from "../api/axiosInstance";
import { uriSerialized } from "../utils/uriSerialized";
import { AxiosError } from "axios";



type ErrorResponse = {
  message: string;
};



type SkillApiState = {
  status: "idle" | "loading" | "failed";
  skillData: any;
  error: string | null;
};

const initialState: SkillApiState = {
  status: "idle",
  skillData: null,
  error: null,
};



export const listSkills = createAsyncThunk(
  "listSkills",
  async (queryOptions: any, { rejectWithValue }) => {
    try {
        const query = queryOptions ? "?" + uriSerialized(queryOptions) : ""
      const response = await axiosInstance.get(`/skill/list-all-skills${query}`);
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

const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listSkills.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        listSkills.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.skillData = action.payload.data;
          //console.log(state.skillData);
          
        }
      )
      .addCase(listSkills.rejected, (state, action) => {
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

export default skillSlice.reducer;


