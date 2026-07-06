import { baseApi } from "../Base"

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        changePassword: builder.mutation({
            query: (body) => ({
                url: "/user/change-password",
                method: "POST",
                body
            }),
        }),
        editProfile: builder.mutation({
            query: (body) => ({
                url: "/user/update",
                method: "PATCH",
                body
            }),
        }),
    }),
})

export const {
    useChangePasswordMutation,
    useEditProfileMutation
} = userApi