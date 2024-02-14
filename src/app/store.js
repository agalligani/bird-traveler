import { configureStore } from "@reduxjs/toolkit";
import birdQueryReducer from "../features/BirdQuery/birdQuerySlice"
import speciesGroupingReducer from "../features/SpeciesGrouping/speciesGroupingSlice"
import locationReducer from "../features/Location/locationSlice"

export const store = configureStore({
    reducer: {
        birdQuery: birdQueryReducer, 
        speciesGrouping: speciesGroupingReducer,
        location: locationReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 500 },
        serializableCheck: { warnAfter: 500 },
    })
})