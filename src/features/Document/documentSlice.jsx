import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    docType: "birdlist",
    docDirectory: "~/Documents",
    docInlineStyle: "default",
    docFilename: "birdlist.html",
    docTitle: "My Bird List",
    docBody: "<!DOCTYPE html><html><head><title>My Bird List</title></head><body></body></html>",
    docCreated: null,
    docIsSaved: false,
    docuIsAltered: false,
    docMode: "view",
    createdDocument: false,
    /** @TODO make modals their own feature */
    modalState: false
}

export const documentSlice = createSlice({
    name: "document",
    initialState: initialState,
    reducers: {
        updateDocumentType(state, action) {
            state.docType = action.payload
        },
        updateDocumentDirectory(state, action) {
            state.docDirectory = action.payload
        },
        updateDocumentFilename(state, action) {
            state.docFilename = action.payload
        },
        updateDocumentCreated(state, action) {
            state.docCreated = action.payload
        },
        updateDocumentSaved(state, action) {
            state.docIsSaved = action.payload
        },
        updateDocumentAltered(state, action) {
            state.docuIsAltered = action.payload
        },
        updateDocumentTitle(state, action) {
            state.docTitle = action.payload
        },
        updateDocumentBody(state, action) {
            state.docBody = action.payload
        },
        setCreateDocument(state, action) {
            state.createdDocument = action.payload
        },
        setModalState(state, action) {
            state.modalState = action.payload
        },
}})

export const {
    updateDocumentType,
    updateDocumentDirectory,
    updateDocumentFilename,
    updateDocumentCreated,
    updateDocumentSaved,
    updateDocumentAltered,
    updateDocumentTitle,
    updateDocumentBody,
    setCreateDocument,
    setModalState,
} = documentSlice.actions

export default documentSlice.reducer