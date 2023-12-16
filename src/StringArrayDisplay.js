// StringArrayDisplay.js
import React from 'react';

const StringArrayDisplay = ({ stringArray }) => {
    return (
        <div>
            <h2>String Array Contents:</h2>
            <ul>
                {stringArray ? (
                    stringArray.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))
                ) : (
                    <li>No data available</li>
                )}
            </ul>
        </div>
    );
};

export default StringArrayDisplay;

