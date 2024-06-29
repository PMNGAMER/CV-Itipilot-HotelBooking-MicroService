import "../styles/singlePage.scss";
import { useState, useEffect } from "react";
import iaxios from "../axiosSetUp";
import { SingleImage } from "./imagePage";
function UserHotel({ id }) {
  const [hotel, setHotelData] = useState(null);
  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const res = await iaxios.get(`http://localhost:4800/hotels/${id}`);
        setHotelData(res.data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };
    fetchHotelData();
  }, []); 
  console.log(hotel);
  return (
    <div className="singlePageContainer">
      {hotel && hotel.imageId ? (
        <SingleImage imageId={hotel.imageId} />
      ) : null}
      <span>{hotel ? hotel.address : "Loading..."}</span>
      <div>$ {hotel ? hotel.price : "Loading..."}</div>
      <span>{hotel && hotel.userId ? hotel.userId.name : "Loading..."}</span>
      <span>{hotel && hotel.userId ? hotel.userId.phone : "Loading..."}</span>
      <img src="/bed.png" alt="" />
      <span>{hotel ? hotel.bedroom + " beds" : "Loading..."}</span>
      <img src="/bath.png" alt="" />
      <span>{hotel ? hotel.bathroom + " bathrooms" : "Loading..."}</span>
    </div>
  );
}
export default UserHotel;
