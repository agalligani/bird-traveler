import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // locId: "L3971768"
    locId: "PE-MDD"
}

export const locationSlice = createSlice({
    name: "location",
    initialState: initialState,
    reducers: {
        updateLocation(state, action) {
            state.locId = action.payload
        },
    }
})

export const { 
    updateLocation,
} = locationSlice.actions
export default locationSlice.reducer

