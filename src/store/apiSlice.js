import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth?.accessToken;
            if (token) {
                headers.append('Authorization', `Bearer ${token}`);
            }
            const activeLocale = localStorage.getItem('activeLocale');
            if (activeLocale) {
                headers.append('Accept-Language', activeLocale);
            }
            return headers;
        }
    }),
    endpoints: builder => ({})
})
