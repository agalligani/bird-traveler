import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    regionId: null,
    selectedRegion: null,
    countryId: "US",
    countryName: "United States",
    regionalCountryList: [],
    subnational1List: [],
    subnational2List: [],
    subnational1Name: null,
    subnational2Name: null,
    hotSpotId: null,
    hotSpotName: null,
    hotSpots: [],
    subRegion1Id: null,
    subRegion2Id: null,
    locId: "VN-25", // Vietnam location ID for Dong Nai
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

        updateSubnational2List(state, action) {
            state.subnational2List = action.payload
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

        updateSubnational1Name(state, action) {
            state.subnational1Name = action.payload
        },

        updateSubnational2Name(state, action) {
            state.subnational2Name = action.payload
        },

        updateHotSpots(state, action) {
            state.hotSpots = action.payload
        },
    }
})

export const { 
    updateLocation,
    updateLocationMessage,
    updateRegion,
    updateRegionalCountryList,
    updateSubnational1List,
    updateSubnational2List,
    updateSubnational1Name,
    updateSubnational2Name,
    updateCountry,
    updateCountryName,
    updateHotSpots,
    updateHotSpotId,
    updateHotSpotName,
} = locationSlice.actions
export default locationSlice.reducer

