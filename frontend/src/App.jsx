import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPage from "./components/listPage";
import { Layout } from "./components/layout";
import NewHotelPage from "./components/newHotelPage";
import ProfilePage from "./components/profilePage";
import { UserContext } from "./context/UserContext";
function App() {
  const userData = useContext(UserContext);
  const tmp = userData?userData.userData:null;  
  const currentUser = tmp?tmp.data:null;
  if (currentUser === null) {
    return null;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}/>
        <Route path="/list" element={<ListPage />} />
        <Route path="/add" element={<NewHotelPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
