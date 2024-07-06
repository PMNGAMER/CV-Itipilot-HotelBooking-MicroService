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
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden px-6 py-8 sm:px-10 sm:py-12">
      {!deleted && (
        <>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">{booking.address}</span>
            <div className="text-2xl font-bold text-gray-800">$ {booking.price}</div>
          </div>
          <div className="text-gray-700 text-lg mt-4">{booking.city}</div>
          <div className="flex items-center space-x-4 mt-6">
            <div className="flex items-center space-x-2">
              <img src="/bed.png" alt="" className="h-6 w-6" />
              <span className="text-gray-700">{booking.bedroom} beds</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src="/bath.png" alt="" className="h-6 w-6" />
              <span className="text-gray-700">{booking.bathroom} bathrooms</span>
            </div>
          </div>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-md mt-6 w-full"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default UserBooking;
