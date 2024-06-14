import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import { Layout } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import ProfilePage from "./routes/profilePage/profilePage";
import { setCookie } from "./cookie";
import axios from "axios";
import { UserProvider } from "./context/UserContext";
import { SocketContextProvider } from "./context/SocketContext";
function App() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:4800/userdataclient"); // Assuming this route exists on your backend server
        setUserData(response.data); // Assuming the token is returned in the response data
        setCookie('userData', response.data); // Set the cookie with the token
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [userData]);
  return (
    <BrowserRouter>
      <UserProvider>
        <SocketContextProvider>
          <Routes>
            {userData !== null ? (
              <Route path="/" element={<Layout />}>
                <Route path="list" element={<ListPage />} />
                <Route path=":id" element={<SinglePage />} />
                <Route path="add" element={<NewPostPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            ) : null}
          </Routes>
        </SocketContextProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
