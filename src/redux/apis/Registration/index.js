import { MOCK_PARTICIPANTS } from "../../../helpers/data"
import { baseApi } from "../Base"

const normalizePhone = (phone) => {
    if (!phone) return ""
    return String(phone).replace(/\D/g, "")
}

const searchByPhone = (number, dialing_code) => {
    const search_digits = normalizePhone(number)
    return MOCK_PARTICIPANTS.filter((item) => {
        const participant_digits = normalizePhone(item.phone?.number)
        const full_digits = normalizePhone(`${dialing_code}${number}`)
        return (
            participant_digits === search_digits
            || full_digits.endsWith(search_digits)
            || participant_digits.endsWith(search_digits)
        )
    })
}

const searchByYsbId = (membership_id) => {
    const query = membership_id?.trim().toLowerCase()
    if (!query) return []
    return MOCK_PARTICIPANTS.filter((item) =>
        item.membership_id?.toLowerCase().includes(query)
    )
}

export const registrationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        searchParticipant: builder.query({
            queryFn: ({ type = "phone", number, dialing_code, membership_id }) => {
                const results = type === "ysb_id"
                    ? searchByYsbId(membership_id)
                    : searchByPhone(number, dialing_code)

                return { data: { data: results } }
            },
        }),
        createRegistration: builder.mutation({
            queryFn: async (body) => {
                console.log("Registration payload:", body)
                return {
                    data: {
                        success: true,
                        message: "Registration created successfully",
                        data: body,
                    },
                }
            },
            invalidatesTags: ["Registrations"],
        }),
    }),
})

export const {
    useLazySearchParticipantQuery,
    useCreateRegistrationMutation,
} = registrationApi
