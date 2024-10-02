import { apiSlice } from "./apiSlice";


export const realmsApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        listRealms: builder.query({
            query: () => ({
                url: '/realms'
            }),
            providesTags: ['Realms']
        })
    })
});

export const { useLazyListRealmsQuery } = realmsApi;

