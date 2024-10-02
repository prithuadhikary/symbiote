import { apiSlice } from "./apiSlice";

export const roleApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        listRoles: builder.query({
            query: (realmId) => {
                const params = new URLSearchParams({ realmId });
                return ({
                    url: '/roles?' + params.toString()
                })
            },
            providesTags: ['Roles']
        })
    })
})

export const { useLazyListRolesQuery } = roleApi;