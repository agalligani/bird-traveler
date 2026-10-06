import { createSlice } from "@reduxjs/toolkit"
import { BirdPhoto } from "./BirdPhoto"

const initialState = {
    birdPhotos: [

    ]
}

export const birdPhotoSlice =  createSlice({
    name: BirdPhoto,
    initialState: initialState,
    reducers: {
        createBirdPhoto: ( state, action ) => {
            state.birdPhotos.push(action.payload)
        }
    }
})
