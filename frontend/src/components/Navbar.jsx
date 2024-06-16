import "../styles/navbar.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
function Navbar() {
  const userData = useContext(UserContext);
  const tmp = userData.userData;  
  const currentUser = tmp.data;
  console.log(currentUser);
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
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
