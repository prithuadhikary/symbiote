import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './authSlice';
import { apiSlice } from './apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

setupListeners(store.dispatch);