import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {axiosInstance} from "../api/axiosInstance";
import { AxiosError } from "axios";

type User = {
  email: string;
  password: string;
};

type NewUser = User & {
  name: string;
};

type UserBasicInfo = {
  success: boolean,
  message: string;
  data: Tokens
};

type UserProfileData = {
  name: string;
  email: string;
};

type ErrorResponse = {
  message: string;
};

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type AuthApiState = {
  basicUserInfo?: UserBasicInfo | null;
  userProfileData?: UserProfileData | null;
  accessToken: string | null,
  refreshToken: string | null,
  status: "idle" | "loading" | "failed";
  error: string | null;
};

const initialState: AuthApiState = {
  basicUserInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  userProfileData: undefined,
  status: "idle",
  error: null,
};


function setTokensToLocalStorage({ accessToken, refreshToken }: Tokens) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

function removeTokensFromLocalStorage() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

export const login = createAsyncThunk(
  "login",
  async (data: User, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/signin", data);
      const resData = response.data;
      setTokensToLocalStorage(resData.data);

      return resData;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        console.log(errorResponse);
        return rejectWithValue(errorResponse);
      }
      console.log(error);
      throw error;
    }
  }
);

export const register = createAsyncThunk(
  "register",
  async (data: NewUser, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      const resData = response.data;

      localStorage.setItem("userInfo", JSON.stringify(resData));

      return resData;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;

        return rejectWithValue(errorResponse);
      }

      throw error;
    }
  }
);

export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/revoke-token", {});
      const resData = response.data;
      removeTokensFromLocalStorage();
      localStorage.removeItem("userInfo");

      return resData;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;

        return rejectWithValue(errorResponse);
      }

      throw error;
    }
  }
);

export const getUser = createAsyncThunk(
  "users/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/auth/profile-data`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorResponse = error.response.data;
        
        return rejectWithValue(errorResponse);
      }

      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<UserBasicInfo>) => {
          state.status = "idle";
          state.basicUserInfo = action.payload;
          state.accessToken = action.payload.data.accessToken;
          state.refreshToken = action.payload.data.refreshToken;
          
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Login failed";
        } else {
          state.error = action.error.message || "Login failed";
        }
      })

      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<UserBasicInfo>) => {
          state.status = "idle";
          state.basicUserInfo = action.payload;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Registration failed";
        } else {
          state.error = action.error.message || "Registration failed";
        }
      })

      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "idle";
        state.basicUserInfo = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message || "Logout failed";
        } else {
          state.error = action.error.message || "Logout failed";
        }
      })

      .addCase(getUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.userProfileData = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error =
            (action.payload as ErrorResponse).message ||
            "Get user profile data failed";
        } else {
          state.error = action.error.message || "Get user profile data failed";
        }
      });
  },
});

export default authSlice.reducer;