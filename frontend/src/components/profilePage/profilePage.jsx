import List from "../../components/list/List";
import "./profilePage.scss";
import {Link} from "react-router-dom";
import {useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { cookie } from "../../cookie";
function ProfilePage() {
  const [userPosts, setUserPosts] = useState([]);
  const userData = useContext(UserContext);
  const tmp = userData.userData;  
  const currentUser = tmp.data;
  console.log(currentUser._id);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4800/users/${currentUser._id}`,{
          headers:{
            Authorization: `Bearer ${cookie.get('userid')}`,
          }
        });
        const userData = response.data;
        const postRequests = userData.posts.map(postId =>
          axios.get(`http://localhost:4800/posts/${postId}`,{
            headers:{
              Authorization: `Bearer ${cookie.get('userid')}`,
            }
          })
        );
        const postResponses = await Promise.all(postRequests);
        const postsData = postResponses.map(postResponse => postResponse.data);
        setUserPosts(postsData);
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
          <List posts={userPosts} />
          <div className="title">
            <h1>Saved List</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
