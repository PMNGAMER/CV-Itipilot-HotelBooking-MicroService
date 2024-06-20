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
    <div>
      {image ? (
        <div>
          <img src={`http://localhost:4800/${image}`} alt={image} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};