import React, { useEffect, useState } from 'react';
import iaxios from '../axiosSetUp';
export const SingleImage = ({imageId}) => {
  const [image, setImage] = useState(null);
  
  const fetchImage = async () => {
      try {
          const response = await iaxios.get(`http://localhost:4800/images/${imageId}`);
          setImage(response.data.image);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };
useEffect(() => {
    fetchImage();
}, []);
return (
  <div className="flex justify-center items-center h-screen">
    {image ? (
      <div className=" overflow-hidden shadow-lg">
        <img
          src={`http://localhost:4800/${image}`}
          alt={image}
          className="w-full h-full object-cover"
        />
      </div>
    ) : (
      <div className="bg-gray-100 px-4 py-2 rounded-md shadow-md">
        <p className="text-gray-500 font-medium">Loading...</p>
      </div>
    )}
  </div>)
};