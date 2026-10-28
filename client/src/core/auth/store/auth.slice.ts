import { createSlice } from "@reduxjs/toolkit";
import { isAuthenticate } from "@/core/server/services/jwt/jwt";

interface AuthState {
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    isAuthenticated: isAuthenticate(),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        sessionStarted: (state) => {
            state.isAuthenticated = true;
        },
        sessionEnded: (state) => {
            state.isAuthenticated = false;
        },
    },
});

export const { sessionStarted, sessionEnded } = authSlice.actions;
export const authReducer = authSlice.reducer;
