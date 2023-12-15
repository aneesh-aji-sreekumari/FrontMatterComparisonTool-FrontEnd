// App.js
import React from 'react';
import UploadPDFComponent from './UploadPDFComponent';
import './App.css'; // Import the CSS file

const App = () => {
  return (
      <div className="app-container">
        <h1>TOC/LOI/LOT Compare Tool</h1>
        <UploadPDFComponent />
      </div>
  );
};

export default App;
