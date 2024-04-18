import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import styles from './PdfViewer.module.css'; // Import the styles module

// Set the PDF.js worker URL.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className={styles.container}>
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {/* Set renderTextLayer to false to not display text under the pages */}
        <Page pageNumber={pageNumber} renderTextLayer={false} />
      </Document>
      {/* Navigation controls */}
      <div className={styles.buttonContainer}>
        <button onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber <= 1}>
          Previous
        </button>
        <button onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber >= numPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;

