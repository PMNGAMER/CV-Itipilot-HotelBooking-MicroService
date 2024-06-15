import "./profilePage.scss";
import {Link} from "react-router-dom";
import {useContext, useState } from "react";
import iaxios from "../../axiosSetUp";
import { useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { cookie } from "../../cookie";
import SinglePage from "../singlePage/singlePage";
function ProfilePage() {
  console.log('profile');
  const [userPostIds, setUserPostIds] = useState([]);
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
        const userData = response.data;
        console.log(userData);
        setUserPostIds(userData.posts.map(postId => postId));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [currentUser]);
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
          </div>
          <div className="info">
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          {userPostIds.map((pid)=><SinglePage id={pid}></SinglePage>)}
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
