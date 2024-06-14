import React, { createContext, useState, useContext } from "react";
import { getCookie } from "../cookie";
import { useEffect } from "react";
const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const user = getCookie('userData');
  useEffect(()=>{
    setUserData(user);
  },[user]);
  return (
    <UserContext.Provider value={{ userData }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  return useContext(UserContext);
};
