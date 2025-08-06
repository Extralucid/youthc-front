import React, { useState } from 'react';
import DocViewerComponent from '../components/DocViewerComponent';
import './MultiFileViewer.css'

const MultiFileViewer = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile([
    { uri: "https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf" }, // Remote file
    { uri: require("https://ontheline.trincoll.edu/images/bookdown/sample-local-pdf.pdf") }, // Local File
  ]);
  };

  return (
    <div className="file-viewer-container">
      <input 
        type="file" 
        onChange={handleFileChange}
        accept=".pdf,.docx,.xlsx,.pptx,.jpg,.png,.txt"
      />
      
      <DocViewerComponent file={file} />
    </div>
  );
};

export default MultiFileViewer;