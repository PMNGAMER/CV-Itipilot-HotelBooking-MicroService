import "./layout.scss";
import Navbar from "../navbar/Navbar";
import SearchBar from "../searchBar/SearchBar";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { cookie } from "../../cookie";
function Layout() {
  const userData = useContext(UserContext);
  const tmp = userData.userData;  
  const currentUser = tmp.data;
  cookie.set('userid', currentUser._id, {path:"/"});
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <SearchBar/>
      </div>
    </div>
  );
}
export { Layout };
