import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import rawStyles from './styles.css?inline'

import {
    updateDocumentType,
    updateDocumentDirectory,
    updateDocumentFilename,
    updateDocumentCreated,
    updateDocumentSaved,
    updateDocumentAltered,
    updateDocumentTitle,
    updateDocumentBody,
  } from "./documentSlice"

const FileModal = () => {
    const [modalState, setModelState] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch()

 return (
    <div className="modalContainer">
        <button className="modalButton" onClick={() => setModelState(true)}>Open Modal Box</button>
        {modalState && (
        <div className="modalOverlay" onClick={() => setModelState(false)} >
            <div className="modalBox" onClick={(e) => e.stopPropagation()}>
            <h2>Please add a filename</h2>
            <input placeholder="~/Downloads" type="text" value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}>
            </input>
            <button onClick={() => {setModelState(false),
                console.log({inputValue})
                dispatch(updateDocumentFilename({inputValue}));
            }} className="modalButton">Save</button>
            </div>
        </div>
        )}
    </div>
 )
}


const Document = () => {
  const dispatch = useDispatch()
  const {
    docType,
    docDirectory,
    docFilename,
    docTitle,
    docBody,
    docCreated,
    docIsSaved,
    docuIsAltered,
    docMode,
    createdDocument
  } = useSelector(
    (state) => state.document
  )

  const [modalState, setModelState] = useState(false);

  
  const [htmlContent, setHtmlContent] = useState()
  const handleSaveToFile = (content) => {
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "my-document-www.html"; // The filename it saves as
    document.body.appendChild(link);
    link.click();
    // Clean up memory
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <pre>{htmlContent}</pre>
        <button id="copyDocBtn" onClick={() =>{
          setModelState(true)
          // return("")
          const birdQueryHTML = "<!DOCTYPE html>\n" + "<style>\n" + rawStyles + "\n</style>\n"
              +"\n<ul class=\"nav nav-pills\">"+document.getElementById("nav-pills").innerHTML + "\n</ul>\n"
              + document.getElementById("bird-query-full-regional").innerHTML + 
              "\n<button id=\"topBtn\" onclick=\"window.scrollTo({ top: 0, behavior: 'smooth' })\">TOP</button>\n"+
              "\n</html>"
              dispatch(updateDocumentBody(birdQueryHTML))
              // dispatch(updateDocumentTitle)("My Bird List")
              // dispatch(updateDocumentFilename)("birdlist.html"),
          setHtmlContent(birdQueryHTML)
        handleSaveToFile(birdQueryHTML)
        }}>Doc Save</button>
        <FileModal />
    </>
  )
}

export default Document