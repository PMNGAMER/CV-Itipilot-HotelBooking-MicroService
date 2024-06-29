import "../styles/profilePage.scss";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:4800/bookings/${userDataFetch.email}`);
        setUserBookings(res.data);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching user bookings:", error);
        setError("Failed to fetch user bookings"); 
        setLoading(false); 
      }
    };
    fetchUserBookings();
  }, [userDataFetch.email]); 
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <Avartar imageId={userDataFetch.imageId}></Avartar>
          <div className="title">
            <h1>User Information</h1>
          </div>
          <div className="info">
            <span>
              Username: <b>{userDataFetch.name}</b>
            </span>
            <span>
              E-mail: <b>{userDataFetch.email}</b>
            </span>
            <span>
              Phone: <b>{userDataFetch.phone}</b>
            </span>
          </div>
          <div className="title">
            <h1>My Hotels</h1>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {userDataFetch.hotels.map((hid) => (
                <UserHotel key={hid} id={hid}></UserHotel>
              ))}
              <Link to="/add">
                <button>Create New Hotel Post</button>
              </Link>
            </div>
          </div>
          <div className="title">
            <h1>My Bookings</h1>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {userBookings.map((booking) => (
                  <UserBooking key={booking._id} booking={booking}></UserBooking>
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
