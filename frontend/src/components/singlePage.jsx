import { SingleImage } from "./imagePage";
// import { useAuthContext } from "../context/UserContext";
import axios from "axios";
import { toast, Toaster } from "sonner";


function SinglePage({ hotel }) {
  // const { userDataFetch } = useAuthContext();

  const handleBookClick = async () => {
    try {
      const response = await axios.post(`http://localhost:4800/bookings`, {
        price: hotel.price,
        address: hotel.address,
        city: hotel.city,
        bedroom: hotel.bedroom,
        bathroom: hotel.bathroom,
      });
      console.log("Booking successful:", response.data);
      toast.success("Booking successfully!");
    } catch (error) {
      console.error("Failed to book hotel:", error);
      toast.error("Booking failed!");
    }
  };
  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
      <Toaster position="top-right" toastOptions={{
          style: {
            borderRadius: "8px",
            padding: "16px 24px",
            fontSize: "17px",
            color:"green"
          },
        }}/>
      {hotel && hotel.imageId ? (
        <SingleImage imageId={hotel.imageId} className="h-64 w-full object-cover" />
      ) : null}
      <div className="p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium">{hotel.address}</span>
          <div className="text-2xl font-bold text-gray-800">$ {hotel.price}</div>
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">{hotel.userId.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">{hotel.userId.phone}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex items-center space-x-2">
            <img src="/bed.png" alt="" className="h-6 w-6" />
            <span className="text-gray-700">{hotel.bedroom} beds</span>
          </div>
          <div className="flex items-center space-x-2">
            <img src="/bath.png" alt="" className="h-6 w-6" />
            <span className="text-gray-700">{hotel.bathroom} bathrooms</span>
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md mt-6 w-full"
          onClick={handleBookClick}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
export default SinglePage;
