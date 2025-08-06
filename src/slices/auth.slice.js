import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axiosInstance";

function setTokensToLocalStorage({ accessToken, refreshToken }) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
}

function removeTokensFromLocalStorage() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

export const login = createAsyncThunk(
    "login",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/signin", data);
            const resData = response.data;
            setTokensToLocalStorage(resData.data);
            return resData;
        } catch (error) {
            if (error.response) {
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
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/auth/signup", data);
            const resData = response.data;
            localStorage.setItem("userInfo", JSON.stringify(resData));
            return resData;
        } catch (error) {
            if (error.response) {
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
            if (error.response) {
                const errorResponse = error.response.data;
                return rejectWithValue(errorResponse);
            }
            throw error;
        }
    }
);


export const checkAuth = createAsyncThunk(
    "users/profile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/auth/profile-data`);
            return response.data;
        } catch (error) {
            if (error.response) {
                const errorResponse = error.response.data;
                return rejectWithValue(errorResponse);
            }
            throw error;
        }
    }
);

const initialState = {
    basicUserInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    userProfileData: undefined,
    status: "idle",
     loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
                state.loading= true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "idle";
                state.basicUserInfo = action.payload;
                state.accessToken = action.payload.data.accessToken;
                state.refreshToken = action.payload.data.refreshToken;
                state.loading= false;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.message || action.error?.message || "Login failed";
                state.loading= false;
            })

            .addCase(register.pending, (state) => {
                state.status = "loading";
                state.loading= true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = "idle";
                state.loading= false;
                state.basicUserInfo = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = "failed";
                state.loading= false;
                state.error = action.payload?.message || action.error?.message || "Registration failed";
            })

            .addCase(logout.pending, (state) => {
                state.status = "loading";
                state.loading= true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = "idle";
                state.loading= false;
                state.basicUserInfo = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = "failed";
                state.loading= false;
                state.error = action.payload?.message || action.error?.message || "Logout failed";
            })

            .addCase(checkAuth.pending, (state) => {
                state.status = "loading";
                state.loading= true;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.status = "idle";
                state.loading= false;
                state.userProfileData = action.payload;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.status = "failed";
                state.loading= false;
                state.error = action.payload?.message || action.error?.message || "Get user profile data failed";
            });
    },
});

export default authSlice.reducer;