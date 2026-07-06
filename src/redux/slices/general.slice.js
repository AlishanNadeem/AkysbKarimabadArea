import { createSlice } from "@reduxjs/toolkit"
import { generalApi } from "../apis/General"

const initial = {
    first_launch: true,
    app_config: null
}

const generalSlice = createSlice({
    name: "general",
    initialState: initial,
    reducers: {
        completeOnboarding: (state) => {
            state.first_launch = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                generalApi.endpoints.getVersion.matchFulfilled,
                (state, action) => {
                    state.app_config = action.payload.data
                }
            )
    }
})

export const { completeOnboarding } = generalSlice.actions
export default generalSlice.reducer