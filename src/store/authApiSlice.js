import { apiSlice } from "./apiSlice";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (loginRequest) => ({
                url: '/login',
                method: 'POST',
                body: loginRequest
            })
        })
    })
})

export const useLoginMutation = authApiSlice.useLoginMutation;


