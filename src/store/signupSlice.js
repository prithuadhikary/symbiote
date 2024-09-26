import { apiSlice } from "./apiSlice";

const signupSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        usernameAvailable: builder.mutation({
            query: (username) => ({
                url: `/signup/usernameAvailable/${username}`,
            })
        }),
        singup: builder.mutation({
            query: (signupRequest) => ({
                url: '/signup',
                method: 'POST',
                body: signupRequest
            })       
        })
    })
});

export const { useSingupMutation, useUsernameAvailableMutation } = signupSlice;