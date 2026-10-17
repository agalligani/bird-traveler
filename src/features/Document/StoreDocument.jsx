import React, { useState } from "react";

export default function HtmlDocumentManager() {
  // 1. Store the HTML document string in React state
  const [htmlContent, setHtmlContent] = useState(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>My Generated Document</title>
      <style>
        body { font-family: sans-serif; padding: 20px; background-color: #f4f4f4; }
        h1 { color: #333; }
      </style>
    </head>
    <body>
      <h1>Hello World!</h1>
      <p>This HTML document was created entirely in React.</p>
    </body>
    </html>
  `);

  // 2. Function to trigger a local download/storage of the HTML file
  const handleSaveToFile = () => {
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.href = url;
    link.download = "my-document.html"; // The filename it saves as
    document.body.appendChild(link);
    link.click();
    
    // Clean up memory
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>HTML Document Manager</h2>
      
      {/* Editable Text Area to modify your stored HTML */}
      <textarea
        value={htmlContent}
        onChange={(e) => setHtmlContent(e.target.value)}
        rows={10}
        style={{ width: "100%", fontFamily: "monospace", marginBottom: "10px" }}
      />

      <div style={{ marginBottom: "20px" }}>
        <button onClick={handleSaveToFile} style={{ marginRight: "10px", padding: "8px 16px" }}>
          Save & Download HTML File
        </button>
      </div>

      <h3>Live Preview of Stored HTML:</h3>
      {/* 3. Render the stored HTML string safely inside an iframe */}
      <iframe
        srcDoc={htmlContent}
        title="HTML Preview"
        style={{ width: "100%", height: "300px", border: "1px solid #ccc" }}
      />
    </div>
  );
}
