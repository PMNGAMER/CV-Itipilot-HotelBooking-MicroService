import "../styles/profilePage.scss";
import {Link} from "react-router-dom";
import SinglePage from "./singlePage";
import { useAuthContext } from "../context/UserContext";
import { Avartar } from "./avatarPage";
function ProfilePage() {
  const {userDataFetch} = useAuthContext();
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
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Hotel Post</button>
            </Link>
          </div>
          <div style={{display:'flex',flexWrap:'wrap'}}>
          {userHotelIds.map((hid)=><SinglePage id={hid}></SinglePage>)}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
