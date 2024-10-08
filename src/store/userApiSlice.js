import { apiSlice } from "./apiSlice";

export const usersApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        listUsers: builder.query({
            query: (page = 0) => `/users?page=${page}`,
            providesTags: (_) => ["Users"],
        }),
        createUser: builder.mutation({
            query: (request) => ({
                url: '/users',
                method: 'post',
                body: request
            }),
            invalidatesTags: ["Users"]
        }),
        updateUser: builder.mutation({
            query: ({id, request}) => {
                console.log(id, request)
                return ({
                    url: '/users/' + id,
                    method: 'put',
                    body: request
                })
            },
            invalidatesTags: ["Users"]
        })
    })
});

export const { useLazyListUsersQuery, useCreateUserMutation, useUpdateUserMutation } = usersApi;