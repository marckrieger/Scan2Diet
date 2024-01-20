import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Camera(props) {

    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Check if a file is selected
        if (!file) {
            console.error('No file selected.');
            return;
        }

        // Create a FormData object
        const formData = new FormData();
        formData.append('receipt_image', file);

        try {
            const response = await axios.post('http://192.168.178.21:8000/api/upload_receipt/', formData, {
                headers: {
                    // If needed, add headers like authentication token, content type, etc.
                    // 'Authorization': 'Bearer your_token_here',
                    'Content-Type': 'multipart/form-data', // Important for file uploads
                },
            });

            console.log(response.data);
            // Handle success, e.g., show a success message to the user
        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle failure, e.g., show an error message to the user
        }
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="receiptImage">Take a Photo:</label>
                <input
                    type="file"
                    id="receiptImage"
                    name="photo"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Camera;