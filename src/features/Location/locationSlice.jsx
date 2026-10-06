import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    regionId: null,
    selectedRegion: null,
    countryId: "US",
    regionalCountryList: [],
    subnational1List: [],
    subnational2List: [],
    subRegion1Id: null,
    subRegion2Id: null,
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

        updateRegion(state, action) {
            state.regionId = action.payload
        },

        updateRegionalCountryList(state, action) {
            state.regionalCountryList = action.payload
        },

        updateSubnational1List(state, action) {
            state.subnational1List = action.payload
        },

        updateCountry(state, action) {
            state.countryId = action.payload
        },

        updateLocation(state, action) {
            state.locId = action.payload
        },
    }
})

export const { 
    updateLocation,
    updateRegion,
    updateRegionalCountryList,
    updateSubnational1List,
    updateCountry,
} = locationSlice.actions
export default locationSlice.reducer

