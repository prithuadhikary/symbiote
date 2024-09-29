import { apiSlice } from "./apiSlice";

export const usersApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        listUsers: builder.query({
            query: (page = 0) => `/users?page=${page}`
        })
    })
})

export const { useListUsersQuery } = usersApi;