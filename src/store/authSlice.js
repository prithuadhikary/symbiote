import { createSelector, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: null,
        profile: null
    },
    reducers: {
        setAccessToken(state, action) {
            state.accessToken = action.payload.accessToken;
            state.profile = jwtDecode(state.accessToken);
        },
        doLogout(state) {
            state.accessToken = null;
            state.profile = null;
            localStorage.clear();
        }
    }
})

export const { setAccessToken, doLogout } = authSlice.actions;

const selectAuthSlice = state => state.auth;

export const selectAccessToken = createSelector(
    selectAuthSlice,
    authSlice => authSlice.accessToken
);

export const selectProfile = createSelector(
    selectAuthSlice,
    authSlice => authSlice.profile
);

export default authSlice;