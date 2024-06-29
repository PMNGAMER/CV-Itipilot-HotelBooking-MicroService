import "../styles/newHotelPage.scss";
import iaxios from "../axiosSetUp";
import { ImageUploader } from "./imageUploader";
import { useState,useEffect } from "react";
import { useAuthContext } from "../context/UserContext";
function NewHotelPage() {

  function getCookie(name) {
    const cookieRegex = new RegExp(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
    const cookieMatch = document.cookie.match(cookieRegex);
    return cookieMatch ? decodeURIComponent(cookieMatch[2]) : null;
  }

  const {userDataFetch} = useAuthContext();
  const [imageId, setImageId] = useState(null);
  const [longtitude, setLongtitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  
  useEffect(() => {
    const x = parseFloat(getCookie('x'));
    const y = parseFloat(getCookie('y'));
    if (x) {
      setLongtitude(parseFloat(x));
    }
    if (y) {
      setLatitude(parseFloat(y));
    }
  }, []);

  if (longtitude === null || latitude === null) {
    return <div>Loading...</div>;
  }
  console.log(longtitude," , ", latitude);
  const onImage = (imgId) =>{
    setImageId(imgId);
  }
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
        latitude: latitude,
        longitude: longtitude,
      },{
        headers:{
          Authorization: `Bearer ${userDataFetch._id}`,
        }
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Hotel</h1>
        <div className="wrapper">
          <ImageUploader onImageUpload={onImage}></ImageUploader>
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <button className="sendButton">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default NewHotelPage;
