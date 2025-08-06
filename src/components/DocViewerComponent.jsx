import React, { useState } from 'react';
//import { DocViewer } from '@cyntler/react-doc-viewer';
import DocViewer, {DocViewerRenderers} from "react-doc-viewer";
import './DocViewerStyles.css';

const DocViewerComponent = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const docs = file ? [{ 
    uri: URL.createObjectURL(file),
    fileType: file.name.split('.').pop().toLowerCase()
  }] : [];

  return (
    <div className="file-viewer-container">
      {/* Custom-styled file input */}
      <div className="file-input-wrapper">
        <div className="custom-file-input">
          {fileName || 'Choose a file (PDF, DOCX, XLSX, etc.)'}
        </div>
        <input 
          type="file" 
          onChange={handleFileChange}
          className="hidden-file-input"
          accept=".pdf,.docx,.xlsx,.pptx,.jpg,.png,.txt"
        />
      </div>

      {/* Document Viewer */}
      <div className="doc-viewer-container">
        {file ? (
          <DocViewer 
            documents={docs}
            pluginRenderers={DocViewerRenderers.defaultRenderers}
            config={{
              header: {
                disableHeader: false,
                retainURLParams: false
              }
            }}
          />
        ) : (
          <div className="placeholder">
            <p>No file selected</p>
            <p>Supported formats: PDF, DOCX, XLSX, PPTX, JPG, PNG, TXT</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocViewerComponent;