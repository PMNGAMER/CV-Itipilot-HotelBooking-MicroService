import "../styles/singlePage.scss";
import { SingleImage } from "./imagePage";
import { useAuthContext } from "../context/UserContext";
import axios from "axios";

function SinglePage({ hotel }) {
  const { userDataFetch } = useAuthContext();

  const handleBookClick = async () => {
    try {
      const response = await axios.post(`http://localhost:4800/bookings`, {
        price: hotel.price,
        address: hotel.address,
        city: hotel.city,
        bedroom: hotel.bedroom,
        bathroom: hotel.bathroom,
        name: userDataFetch.name,
        email: userDataFetch.email,
      });
      console.log("Booking successful:", response.data);
    } catch (error) {
      console.error("Failed to book hotel:", error);
    }
  };
  return (
    <div className="singlePageContainer">
      {hotel && hotel.imageId ? <SingleImage imageId={hotel.imageId} /> : null}
      <span>{hotel.address}</span>
      <div>$ {hotel.price}</div>
      <span>{hotel.userId.name}</span>
      <span>{hotel.userId.phone}</span>
      <img src="/bed.png" alt="" />
      <span>{hotel.bedroom + " beds"}</span>
      <img src="/bath.png" alt="" />
      <span>{hotel.bathroom + " bathrooms"}</span>
      <button className="bookButton" onClick={handleBookClick}>
        Book Now
      </button>
    </div>
  );
}
export default SinglePage;
