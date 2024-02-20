import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    locId: "L3971768",
    locFavorites: [],
    regions: [],
    

    // locId: "PE-MDD"
    // Sherri's place in CR
    // locId: "L3751192"
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

