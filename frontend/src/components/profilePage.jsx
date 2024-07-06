import { Link } from "react-router-dom";
import UserHotel from "./userHotel";
import UserBooking from "./userBooking";
import { useAuthContext } from "../context/UserContext";
import { Avartar } from "./avatarPage";
import { useState, useEffect } from "react";
import axios from "axios";
function ProfilePage() {
  const { userDataFetch } = useAuthContext();
  const [userBookings, setUserBookings] = useState([]);
  const [userHotels, setUserHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:4800/bookings`);
        setUserBookings(res.data);
        const res1 = await axios.get(`http://localhost:4800/hotels`);
        setUserHotels(res1.data);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching user bookings:", error);
        setError("Failed to fetch user bookings"); 
        setLoading(false); 
      }
    };
    fetchUser();
  }, []); 
  return (
    <div className="profilePage bg-black py-10">
      <div className="details max-w-5xl mx-auto">
        <div className="wrapper bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center space-x-6">
            <Avartar imageId={userDataFetch.imageId} />
            <div className="title">
              <h1 className="text-2xl font-bold">User Information</h1>
            </div>
          </div>
          <div className="info mt-6 space-y-2">
            <span>
              Username: <b className="font-bold">{userDataFetch.name}</b>
            </span>
            <span>
              E-mail: <b className="font-bold">{userDataFetch.email}</b>
            </span>
            <span>
              Phone: <b className="font-bold">{userDataFetch.phone}</b>
            </span>
          </div>
          <div className="my-8">
            <div className="title">
              <h1 className="text-2xl font-bold">My Hotels</h1>
            </div>
            <div className="flex flex-wrap -mx-2 mt-4">
              {userHotels.map((hotel) => (
                <div key={hotel._id} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
                  <UserHotel hotel={hotel} />
                </div>
              ))}
              <div className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
                <Link to="/add">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full">
                    Create New Hotel Post
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="my-8">
            <div className="title">
              <h1 className="text-2xl font-bold">My Bookings</h1>
            </div>
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="flex flex-wrap -mx-2">
                {userBookings.map((booking) => (
                  <div key={booking._id} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
                    <UserBooking booking={booking} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
