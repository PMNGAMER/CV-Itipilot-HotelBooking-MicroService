import iaxios from "../axiosSetUp";
import { ImageUploader } from "./imageUploader";
import { useState,useEffect } from "react";
// import { useAuthContext } from "../context/UserContext";
function NewHotelPage() {

  // function getCookie(name) {
  //   const cookieRegex = new RegExp(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
  //   const cookieMatch = document.cookie.match(cookieRegex);
  //   return cookieMatch ? decodeURIComponent(cookieMatch[2]) : null;
  // }

  // const {userDataFetch} = useAuthContext();
  const [imageId, setImageId] = useState(null);
  // const [longtitude, setLongtitude] = useState(null);
  // const [latitude, setLatitude] = useState(null);
  
  // useEffect(() => {
  //   const x = parseFloat(getCookie('x'));
  //   const y = parseFloat(getCookie('y'));
  //   if (x) {
  //     setLongtitude(parseFloat(x));
  //   }
  //   if (y) {
  //     setLatitude(parseFloat(y));
  //   }
  // }, []);

  if (longtitude === null || latitude === null) {
    return <div>Loading...</div>;
  }
  console.log(longtitude," , ", latitude);
  const onImage = (imgId) =>{
    setImageId(imgId);
  }
  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    try {
      const res = await iaxios.post("http://localhost:4800/hotels", {
        imageId : imageId,
        price: parseInt(inputs.price),
        address: inputs.address,
        city: inputs.city,
        bedroom: parseInt(inputs.bedroom),
        bathroom: parseInt(inputs.bathroom),
        latitude: getRandomInt(1,100),
        longtitude: getRandomInt(1,100),
      },
      // {
      //   headers:{
      //     Authorization: `Bearer ${userDataFetch._id}`,
      //   }
      // }
    );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Add New Hotel</h1>
          <div className="space-y-6">
            <ImageUploader onImageUpload={onImage} />
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="bedroom" className="block text-sm font-medium text-gray-700">
                    Bedroom Number
                  </label>
                  <input
                    min={1}
                    id="bedroom"
                    name="bedroom"
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="bathroom" className="block text-sm font-medium text-gray-700">
                    Bathroom Number
                  </label>
                  <input
                    min={1}
                    id="bathroom"
                    name="bathroom"
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NewHotelPage;
