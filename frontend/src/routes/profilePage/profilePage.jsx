import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import {Link} from "react-router-dom";
import {useState } from "react";
import cookie from "../../../../backend/cookie";
import axios from "axios";
function ProfilePage() {
  const [userPosts, setUserPosts] = useState([]);
  const [userSavedPosts, setUserSavedPosts] = useState([]);
  const [userChats, setUserChats] = useState([]);
  const currentUser = JSON.parse(cookie.get('userData'));
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4800/users/${currentUser._id}`);
        const userData = response.data;
        const postRequests = userData.posts.map(postId =>
          axios.get(`http://localhost:4800/posts/${postId}`)
        );
        const postResponses = await Promise.all(postRequests);
        const postsData = postResponses.map(postResponse => postResponse.data);
        setUserPosts(postsData);
        const postSavedRequests = userData.savedPosts.map(postId =>
          axios.get(`http://localhost:4800/posts/${postId}`)
        );
        const postSavedResponses = await Promise.all(postSavedRequests);
        const postsSavedData = postSavedResponses.map(postResponse => postResponse.data);
        setUserSavedPosts(postsSavedData);
        const chatRequests = userData.chats.map(chatId =>
          axios.get(`http://localhost:4800/chats/${chatId}`)
        );
        const chatResponses = await Promise.all(chatRequests);
        const chatsData = chatResponses.map(chatResponse => chatResponse.data);
        setUserChats(chatsData);
        
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
              Avatar:
              <img src={currentUser.avatar || "noavatar.jpg"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
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
          <List posts={userSavedPosts} />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat chats={userChats}/>   
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
