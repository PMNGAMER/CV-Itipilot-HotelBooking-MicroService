import "./navbar.scss";
import { Link } from "react-router-dom";
import { useNotificationStore } from "../../lib/notificationStore";
import { getCookie } from "../../cookie";
function Navbar() {

  const currentUser  = getCookie('userData');

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if(currentUser) fetch();

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>Itipilot</span>
        </a>
      </div>
      <div className="right">
        <div className="user">
          <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
          <span>{currentUser.username}</span>
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
