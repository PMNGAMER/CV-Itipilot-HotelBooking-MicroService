import React, { useState } from 'react';
import iaxios from '../axiosSetUp';
export const ImageUploader = ({ onImageUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewURL(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            const response = await iaxios.post('http://localhost:4800/upload', formData);
            if (response.data && response.data.image._id) {
                onImageUpload(response.data.image._id);
            }
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <div className="mb-4">
              <label htmlFor="file" className="block text-gray-700 font-medium mb-2">
                Select an image
              </label>
              <input
                type="file"
                id="file"
                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={handleFileChange}
              />
            </div>
            {previewURL && (
              <div className="mb-4">
                <img
                  src={previewURL}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-md shadow-md"
                />
              </div>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </div>)
};
