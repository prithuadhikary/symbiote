import { apiSlice } from "./apiSlice";


export const authSlice = apiSlice.injectEndpoints({
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

export const useLoginMutation = authSlice.useLoginMutation;


