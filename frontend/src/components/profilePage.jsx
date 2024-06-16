import "../styles/profilePage.scss";
import {Link} from "react-router-dom";
import {useContext, useState } from "react";
import iaxios from "../axiosSetUp";
import { useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { cookie } from "../cookie";
import SinglePage from "./singlePage";
function ProfilePage() {
  console.log('profile');
  const [userHotelIds, setUserHotelIds] = useState([]);
  const userData = useContext(UserContext);
  const tmp = userData.userData;  
  const currentUser = tmp.data;
  console.log(currentUser._id);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await iaxios.get(`http://localhost:4800/users/${currentUser._id}`,{
          headers:{
            Authorization: `Bearer ${cookie.get('userid')}`,
          }
        });
        const userDataRes = response.data;
        console.log(userDataRes);
        setUserHotelIds(userDataRes.hotels.map(hotelId => hotelId));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [currentUser]);
  console.log(userHotelIds);
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
          </div>
          <div className="info">
            <span>
              Username: <b>{currentUser.name}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <span>
              Phone: <b>{currentUser.phone}</b>
            </span>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Hotel Post</button>
            </Link>
          </div>
          {userHotelIds.map((hid)=><SinglePage id={hid}></SinglePage>)}
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
