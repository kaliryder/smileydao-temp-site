import React from 'react';
import ThreeSpinningImage from './ThreeSpinningImage';
import PdfViewer from './PdfViewer';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>SMILEY DAO</h1>
        <p>Full site under construction...</p>
        <ThreeSpinningImage></ThreeSpinningImage>
        <PdfViewer fileUrl="/pdfs/investor-guide.pdf" />
        <PdfViewer fileUrl="/pdfs/investor-guide.pdf" />
      </div>
    </div>
  );
}

export default App;
