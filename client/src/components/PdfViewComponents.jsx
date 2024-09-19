import React from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PdfViewerComponent = ({ fileUrl }) => {
    return (
        <div className="pdf-container" style={{ height: '750px' }}>
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js`}>
            <Viewer fileUrl={fileUrl} />
        </Worker>
        </div>
    );
};

export default PdfViewerComponent;
