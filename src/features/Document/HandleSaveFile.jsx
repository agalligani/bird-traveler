import React, { useState } from 'react';
import rawStyles from './styles.css?inline'

export const PersistentSaver = () => {
  const [fileHandle, setFileHandle] = useState(null);
  const handleSaveAs = async (e) => {
    try {
      // Triggers a native system "Save As" picker
      const options = {
        suggestedName: e.fileName,
        types: [{
          description: 'HTML File',
          accept: { 'text/html': ['.html'] },
        }],
      };
      
      const handle = await window.showSaveFilePicker(options);
      setFileHandle(handle);
      // Write data to the selected file/folder path
      await writeFile(handle, e.content);
    } catch (err) {
      console.error('User cancelled or browser unsupported:', err);
    }
  };

  const writeFile = async (handle, contents) => {
    const writable = await handle.createWritable();
    await writable.write(contents);
    await writable.close();
  };

  return <button id="copyDocBtn" onClick={
    () => {
     const birdQueryHTML ={ 
        fileName: document.getElementById("locName").textContent.replaceAll(' ','-')+".html",
        content: "<!DOCTYPE html>\n" + "<style>\n" + rawStyles + "\n</style>\n"
                +"\n<ul class=\"nav nav-pills\">"+document.getElementById("nav-pills").innerHTML + "\n</ul>\n"
                + document.getElementById("bird-query-full-regional").innerHTML + 
                "\n<button id=\"topBtn\" onclick=\"window.scrollTo({ top: 0, behavior: 'smooth' })\">TOP</button>\n"+
                "\n</html>"};
                console.log(birdQueryHTML)
    handleSaveAs(birdQueryHTML)
    }
}>Save Query Results</button>;
};