import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    sortedList: Array(0)
}

export const sortedListSlice = createSlice({   
        name: "sortedList",
        initialState,
        reducers: {
            updateSortedList: (state, action) => {
                state.sortedList = action.payload
            }
        }
    }
)

export const { 
    updateSortedList,
} = sortedListSlice.actions

export default sortedListSlice.reducer