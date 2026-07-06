import { createSlice } from "@reduxjs/toolkit"

const initial = {
    event: null,
    participants: [],
    participant_draft: null,
    payment: {
        status: "pending",
        method: "",
        notes: "",
        amount_paid: 0,
    },
}

const registrationSlice = createSlice({
    name: "registration",
    initialState: initial,
    reducers: {
        setRegistrationEvent: (state, action) => {
            state.event = action.payload
        },
        setRegistrationParticipants: (state, action) => {
            state.participants = action.payload
        },
        setParticipantDraft: (state, action) => {
            state.participant_draft = action.payload
        },
        setRegistrationPayment: (state, action) => {
            state.payment = { ...state.payment, ...action.payload }
        },
        resetRegistration: () => initial,
    },
})

export const {
    setRegistrationEvent,
    setRegistrationParticipants,
    setParticipantDraft,
    setRegistrationPayment,
    resetRegistration,
} = registrationSlice.actions

export default registrationSlice.reducer
