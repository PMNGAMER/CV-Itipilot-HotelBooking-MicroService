import "../styles/navbar.scss";
import { Link } from "react-router-dom";
import { Avartar } from "./avatarPage";
import { useAuthContext } from "../context/UserContext";
function Navbar() {
  const {userDataFetch} = useAuthContext();
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <span>Itipilot</span>
        </a>
      </div>
      <div className="right">
        <div className="user">
        <Avartar imageId={userDataFetch.imageId}></Avartar>
        <Link to="/profile" className="profile">
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
