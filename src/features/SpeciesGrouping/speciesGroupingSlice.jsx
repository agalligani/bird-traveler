import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    speciesGrouping: Array(0),
    filteredSpeciesGrouping: Array(0)
}

export const speciesGroupingSlice = createSlice({

    name: 'speciesGrouping',
    initialState: initialState,
    reducers: {
        updateSpeciesGrouping: (state, action) => {
            state.speciesGrouping.length = 0
            state.speciesGrouping.push(action.payload)
        },
        setFilteredSpeciesGrouping: (state, action) => {
            state.filteredSpeciesGrouping.length = 0
            state.filteredSpeciesGrouping.push(action.payload)
        }
    }
})

export const { 
    updateSpeciesGrouping,
    setFilteredSpeciesGrouping
} = speciesGroupingSlice.actions

export default speciesGroupingSlice.reducer