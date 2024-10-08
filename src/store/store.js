import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from './authSlice';
import { realmsApi } from './realmApiSlice';
import { roleApi } from './roleApiSlice';
import { navSlice } from './navSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [realmsApi.reducerPath]: realmsApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [navSlice.reducerPath]: navSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

setupListeners(store.dispatch);