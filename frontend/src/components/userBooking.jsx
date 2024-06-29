import "../styles/singlePage.scss";
import { useState } from "react"; // Import useState for managing local state
import axios from "axios";

function UserBooking({ booking }) {
  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:4800/bookings/${booking._id}`);
      console.log("Booking deleted successfully:", response.data);
      setDeleted(true);
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div className="singlePageContainer">
      {!deleted && (
        <>
          <span>{booking.address}</span>
          <div>$ {booking.price}</div>
          <div>{booking.city}</div>
          <img src="/bed.png" alt="" />
          <span>{booking.bedroom + " beds"}</span>
          <img src="/bath.png" alt="" />
          <span>{booking.bathroom + " bathrooms"}</span>
          <button onClick={handleDelete} className="deleteButton">
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default UserBooking;
