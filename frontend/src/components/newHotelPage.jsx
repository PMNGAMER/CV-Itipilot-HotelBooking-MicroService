import "../styles/newHotelPage.scss";
import iaxios from "../axiosSetUp";
import { ImageUploader } from "./imageUploader";
import { useState } from "react";
import { useAuthContext } from "../context/UserContext";
function NewHotelPage() {
  const {userDataFetch} = useAuthContext();
  const [imageId, setImageId] = useState(null);
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
        latitude: inputs.latitude,
        longitude: inputs.longitude,
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
        <h1>Add New Post</h1>
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
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <button className="sendButton">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default NewHotelPage;
