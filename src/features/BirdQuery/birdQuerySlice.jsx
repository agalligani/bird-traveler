import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    masterHistoricList: Array(0),
    regionalSpeciesList: Array(0),
    normalizedHistoricList: Array(0),
    speciesDescriptions: Array(0),
    groupedSpecies: Array(0),
    queryDate: ""
}
export const birdQuerySlice = createSlice({

    name: 'birdQuery',
    initialState,
    reducers: {
        updateLocid: (state, action) => {
            state.locId = action.payload
        },
        upDateMasterHistoricList: (state, action) => {
            //immer allows for fake mutations of state...
            state.masterHistoricList.push(action.payload)
        },
        normalizeHistoricList: (state, action) => {
            // state.normalizedHistoricList.length = 0
            state.normalizedHistoricList=action.payload
        },
        setSpeciesDescriptions: ( state, action ) => {
            state.speciesDescriptions.push(action.payload)
        },
        setQueryDate: ( state, action ) => {
            state.queryDate = action.payload
        },
        updateRegionalSpeciesList: ( state, action ) => {
            state.regionalSpeciesList = action.payload
        },
        updateGroupedSpecies: (state, action) => {
            state.groupedSpecies.push(action.payload)
        }
    }
})

export const { 
    updateLocid, 
    upDateMasterHistoricList,
    updateRegionalSpeciesList,
    updateGroupedSpecies,
    normalizeHistoricList,
    setSpeciesDescriptions,
    setQueryDate,
    groupedSpecies
} = birdQuerySlice.actions

export default birdQuerySlice.reducer