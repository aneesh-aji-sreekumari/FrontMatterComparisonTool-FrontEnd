// UploadPDFComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import './UploadPDFComponent.css';

const UploadPDFComponent = () => {
    const [oldRevisionFile, setOldRevisionFile] = useState(null);
    const [currentRevisionFile, setCurrentRevisionFile] = useState(null);

    const handleOldRevisionFileChange = (e) => {
        setOldRevisionFile(e.target.files[0]);
    };

    const handleCurrentRevisionFileChange = (e) => {
        setCurrentRevisionFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        // Check if both files are selected
        if (!oldRevisionFile || !currentRevisionFile) {
            alert('Please select both files.');
            return;
        }

        // Check if both files are in .pdf format
        if (!isPDF(oldRevisionFile) || !isPDF(currentRevisionFile)) {
            alert('Please select PDF files.');
            return;
        }
        alert('You have successfully selected the files');

        try {
            const formData = new FormData();
            formData.append('oldRevisionFile', oldRevisionFile);
            formData.append('currentRevisionFile', currentRevisionFile);

            const additionalData = {
                oldRevisionFilePath: '/dynamic/path/to/' + oldRevisionFile.name,
                currentRevisionFilePath: '/dynamic/path/to/' + currentRevisionFile.name,
            };

            formData.append('additionalData', new Blob([JSON.stringify(additionalData)], { type: 'application/json' }));

            const response = await axios.post('http://localhost:8080/process-pdf', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Response from server:', response.data);
            // Handle the JSON response as needed
        } catch (error) {
            console.error('Error uploading PDFs:', error);
        }
    };

    const isPDF = (file) => {
        return file.type === 'application/pdf';
    };

    return (
        <div className="upload-container">
            <h2>Upload PDFs</h2>

            {/* Display selected file names */}
            {oldRevisionFile && (
                <p>
                    Selected "Old Revision TOC/LOT/LOI" File: {oldRevisionFile.name}
                </p>
            )}
            {currentRevisionFile && (
                <p>
                    Selected "Current Revision TOC/LOT/LOI" File: {currentRevisionFile.name}
                </p>
            )}

            <label className="file-label" htmlFor="oldRevisionFileInput">
                Choose "Old Revision TOC/LOT/LOI" File
            </label>
            <input
                id="oldRevisionFileInput"
                className="file-input"
                type="file"
                onChange={handleOldRevisionFileChange}
            />

            <label className="file-label" htmlFor="currentRevisionFileInput">
                Choose "Current Revision TOC/LOT/LOI" File
            </label>
            <input
                id="currentRevisionFileInput"
                className="file-input"
                type="file"
                onChange={handleCurrentRevisionFileChange}
            />

            <button className="upload-button" onClick={handleUpload}>
                Compare Pdfs
            </button>
        </div>
    );
};

export default UploadPDFComponent;
