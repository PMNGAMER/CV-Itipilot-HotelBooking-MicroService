import React, { useEffect, useState } from 'react';
import iaxios from '../axiosSetUp';
export const Avartar = ({imageId}) => {
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
  <div className="flex justify-center items-center">
    {image ? (
      <div className="rounded-full overflow-hidden">
        <img
          src={`http://localhost:4800/${image}`}
          alt={image}
          className="w-12 h-12 object-cover"
        />
      </div>
    ) : (
      <p className="text-gray-500">Loading...</p>
    )}
  </div>)
};