import { MOCK_PARTICIPANTS, MOCK_REGISTRATIONS } from "../../../helpers/data"
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

let mock_registrations = [...MOCK_REGISTRATIONS]

const findRegistrationIndex = (id) =>
    mock_registrations.findIndex((item) => item._id === id || item.id === id)

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
        getRegistrationsByEvent: builder.query({
            queryFn: ({ event_id }) => {
                const data = mock_registrations.filter(
                    (item) => item.event === event_id
                )
                return { data: { data } }
            },
            providesTags: (result, error, { event_id }) => [
                { type: "Registrations", id: `event-${event_id}` },
            ],
        }),
        getRegistrationById: builder.query({
            queryFn: ({ id }) => {
                const registration = mock_registrations.find(
                    (item) => item._id === id || item.id === id
                )
                if (!registration) {
                    return { error: { status: 404, data: { message: "Registration not found" } } }
                }
                return { data: { data: registration } }
            },
            providesTags: (result, error, { id }) => [
                { type: "Registrations", id },
            ],
        }),
        updateRegistrationStatus: builder.mutation({
            queryFn: async ({ id, action }) => {
                const index = findRegistrationIndex(id)
                if (index === -1) {
                    return { error: { status: 404, data: { message: "Registration not found" } } }
                }

                const registration = { ...mock_registrations[index] }

                if (action === "accept") {
                    registration.payment = {
                        ...registration.payment,
                        status: "paid",
                    }
                } else if (action === "reject") {
                    registration.status = "cancelled"
                } else {
                    return { error: { status: 400, data: { message: "Invalid action" } } }
                }

                mock_registrations[index] = registration

                return {
                    data: {
                        success: true,
                        message: action === "accept"
                            ? "Registration payment accepted"
                            : "Registration rejected",
                        data: registration,
                    },
                }
            },
            invalidatesTags: (result, error, { id }) => {
                const event_id = result?.data?.data?.event
                return [
                    { type: "Registrations", id },
                    ...(event_id ? [{ type: "Registrations", id: `event-${event_id}` }] : []),
                    "Registrations",
                ]
            },
        }),
    }),
})

export const {
    useLazySearchParticipantQuery,
    useCreateRegistrationMutation,
    useGetRegistrationsByEventQuery,
    useGetRegistrationByIdQuery,
    useUpdateRegistrationStatusMutation,
} = registrationApi
