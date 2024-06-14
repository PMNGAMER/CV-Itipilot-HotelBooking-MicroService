import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import { Layout } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import ProfilePage from "./routes/profilePage/profilePage";
import { SocketContextProvider } from "./context/SocketContext";
import axios from "axios"; // Import axios for HTTP requests

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:4800/userdataclient"); // Assuming this route exists on your backend server
        setUserData(response.data); // Assuming the token is returned in the response data
        console.log(response.data); // Access browser cookies
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <BrowserRouter>
      {userData !== null && ( // Conditional rendering based on userData
        <SocketContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="list" element={<ListPage />} />
              <Route path=":id" element={<SinglePage />} />
              <Route path="add" element={<NewPostPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </SocketContextProvider>
      )}
    </BrowserRouter>
  );
}

export default App;
