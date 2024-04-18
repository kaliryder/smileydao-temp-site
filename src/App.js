import React from 'react';
import ThreeSpinningImage from './ThreeSpinningImage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ThreeSpinningImage></ThreeSpinningImage>
        <h1>Welcome to My Simple Site</h1>
        <p>This is a collection of links I find useful:</p>
        <ul>
          <li><a href="https://example.com">Example Link 1</a></li>
          <li><a href="https://example.com">Example Link 2</a></li>
        </ul>
      </header>
    </div>
  );
}

export default App;
