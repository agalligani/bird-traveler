import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    regionId: null,
    selectedRegion: null,
    countryId: "US",
    countryName: "United States",
    regionalCountryList: [],
    subnational1List: [],
    subnational2List: [],
    subRegion1Id: null,
    subRegion2Id: null,
    locId: "L3971768",
    locFavorites: [],
    locMessage: "Choose a region to start defining your birding list",
    regions: [
        {name: 'Africa', id: "af"},
        {name: 'Asia', id: "as"},
        {name: 'Europe', id: "eu"},
        {name: 'Central America', id: "ca"},
        {name: 'North America', id: "na"},
        {name: 'South America', id: "sa"},
        {name: 'Antarctica', id: "aq"}
    ]
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

        updateCountryName(state, action) {
            state.countryName = action.payload
        },


        updateLocation(state, action) {
            state.locId = action.payload
        },

        updateLocationMessage(state, action) {
            state.locMessage = action.payload
        },

    }
})

export const { 
    updateLocation,
    updateLocationMessage,
    updateRegion,
    updateRegionalCountryList,
    updateSubnational1List,
    updateCountry,
    updateCountryName,
} = locationSlice.actions
export default locationSlice.reducer

