import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPage from "./components/listPage/listPage";
import { Layout } from "./components/layout/layout";
import SinglePage from "./components/singlePage/singlePage";
import NewHotelPage from "./components/newHotelPage/newHotelPage";
import ProfilePage from "./components/profilePage/profilePage";
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
            <Route path="add" element={<NewHotelPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SocketContextProvider>
  );
}

export default App;
