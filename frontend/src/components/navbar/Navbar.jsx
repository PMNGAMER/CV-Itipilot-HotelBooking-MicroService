import "./navbar.scss";
import { Link } from "react-router-dom";
import { useNotificationStore } from "../../lib/notificationStore";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
function Navbar() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:4800/userdataclient"); // Assuming this route exists on your backend server
        setUserData(response.data); // Assuming the token is returned in the response data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);
  const currentUser  = userData;
  console.log(currentUser);
  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);
  if(currentUser) fetch();
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <span>Itipilot</span>
        </a>
      </div>
      <div className="right">
        <div className="user">
          <span>{currentUser.name}</span>
          <Link to="/profile" className="profile">
            {number > 0 && <div className="notification">{number}</div>}
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
