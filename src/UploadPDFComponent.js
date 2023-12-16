// UploadPDFComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import './UploadPDFComponent.css';
import StringArrayDisplay from './StringArrayDisplay';

const UploadPDFComponent = () => {
    const [oldRevisionFile, setOldRevisionFile] = useState(null);
    const [currentRevisionFile, setCurrentRevisionFile] = useState(null);
    const [showStringArrayDisplay, setShowStringArrayDisplay] = useState(false); // State to control whether to show StringArrayDisplay
    const [stringArray, setStringArray] = useState([]);


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
        try {
            const formData = new FormData();
            formData.append('oldRevisionFile', oldRevisionFile);
            formData.append('currentRevisionFile', currentRevisionFile);

            // const additionalData = {
            //     oldRevisionFilePath: '/dynamic/path/to/' + oldRevisionFile.name,
            //     currentRevisionFilePath: '/dynamic/path/to/' + currentRevisionFile.name,
            // };

            //formData.append('additionalData', new Blob([JSON.stringify(additionalData)], { type: 'application/json' }));
            const response = await axios.post('http://localhost:8080/api/comparator', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setStringArray(response.data);
            setShowStringArrayDisplay(true);
        } catch (error) {
            console.error('Error uploading PDFs:', error);
        }
    };

    const isPDF = (file) => {
        return file.type === 'application/pdf';
    };

    return (
        <div className="container-fluid">
            <h2>Upload PDFs</h2>
            <div className="row">
                <div className="col">
                    <div><label className="file-label" htmlFor="oldRevisionFileInput">
                        Choose "Old Revision TOC/LOT/LOI" File
                    </label>
                        <input
                            id="oldRevisionFileInput"
                            className="file-input"
                            type="file"
                            onChange={handleOldRevisionFileChange}
                        />
                    </div>
                </div>
                <div className="col">
                    {oldRevisionFile && (
                        <p>
                            Selected "Old Revision TOC/LOT/LOI" File: {oldRevisionFile.name}
                        </p>
                    )}
                </div>
            </div>

            {/* Display selected file names */}
            <div className="row">
                <div className="col">
                    <div>
                        <label className="file-label" htmlFor="currentRevisionFileInput">
                            Choose "Current Revision TOC/LOT/LOI" File
                        </label>
                        <input
                            id="currentRevisionFileInput"
                            className="file-input"
                            type="file"
                            onChange={handleCurrentRevisionFileChange}
                        />
                    </div>
                </div>
                <div className="col">
                    <div>
                        {currentRevisionFile && (
                            <p>
                                Selected "Current Revision TOC/LOT/LOI" File: {currentRevisionFile.name}
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div className="row">
                <button className="upload-button" onClick={handleUpload}>
                    Compare Pdfs
                </button>
            </div>
            <div className="row">
                {showStringArrayDisplay && <StringArrayDisplay stringArray={stringArray} />}
            </div>
        </div>
    );
};

export default UploadPDFComponent;