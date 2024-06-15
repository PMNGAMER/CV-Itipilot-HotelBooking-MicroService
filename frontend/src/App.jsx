import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPage from "./routes/listPage/listPage";
import { Layout } from "./routes/layout/layout";
import SinglePage from "./routes/singlePage/singlePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import ProfilePage from "./routes/profilePage/profilePage";
import { UserContext } from "./context/UserContext";
import { SocketContextProvider } from "./context/SocketContext";
function App() {
  const userData = useContext(UserContext);
  const tmp = userData?userData.userData:null;  
  const currentUser = tmp?tmp.data:null;  // Render nothing until userData is loaded
  if (currentUser === null) {
    return null;
  }

  // Render the app when userData is available
  return (
    <SocketContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="list" element={<ListPage />} />
            <Route path=":id" element={<SinglePage />} />
            <Route path="add" element={<NewPostPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SocketContextProvider>
  );
}

export default App;
