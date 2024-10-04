import { createSelector, createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
    name: 'navSlice',
    reducerPath: "navSlice",
    initialState: {
        activeTab: 'Dashboard'
    },
    reducers: {
        setActiveTab: (state, action) => {
            return { ...state, activeTab: action.payload}
        }
    }
})

export const selectNavSlice = (state) => state.navSlice;

export const selectActiveTab = createSelector(selectNavSlice, (navSlice) => navSlice.activeTab);

export const { setActiveTab } = navSlice.actions;