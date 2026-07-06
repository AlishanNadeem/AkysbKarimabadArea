import { baseApi } from "../Base"

export const eventApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getEvents: builder.query({
            query: (params) => ({
                url: "/event/get",
                method: "GET",
                params,
            }),
            providesTags: ["Events"],
        }),
        createEvent: builder.mutation({
            query: (body) => ({
                url: "/event/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Events"],
        }),
    }),
})

export const {
    useGetEventsQuery,
    useLazyGetEventsQuery,
    useCreateEventMutation,
} = eventApi
