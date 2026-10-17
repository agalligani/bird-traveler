import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    documentType: "birdlist",
    documentDirectory: null,
    documentFilename: null,
    documentTitle: null,
    documentBody: null,
    documentCreated: null,
    documentSaved: null,
    documentAltered: null,
    documentMode: "view",
}

export const documentSlice = createSlice({
    name: "document",
    initialState: initialState,
    reducers: {
        updateDocumentType(state, action) {
            state.documentType = action.payload
        },
        updateDocumentDirectory(state, action) {
            state.documentDirectory = action.payload
        },
        updateDocumentFilename(state, action) {
            state.documentFilename = action.payload
        },
        updateDocumentCreated(state, action) {
            state.documentCreated = action.payload
        },
        updateDocumentSaved(state, action) {
            state.documentSaved = action.payload
        },
        updateDocumentAltered(state, action) {
            state.documentAltered = action.payload
        },
        updateDocumentTitle(state, action) {
            state.documentTitle = action.payload
        },
        updateDocumentBody(state, action) {
            state.documentBody = action.payload
        }
    }   
})

export const {
    updateDocumentType,
    updateDocumentDirectory,
    updateDocumentFilename,
    updateDocumentCreated,
    updateDocumentSaved,
    updateDocumentAltered,
    updateDocumentTitle,
    updateDocumentBody
} = documentSlice.actions

export default documentSlice.reducer