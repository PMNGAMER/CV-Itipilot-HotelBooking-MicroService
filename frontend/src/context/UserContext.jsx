import { createContext, useEffect, useState } from "react";
import iaxios from "../axiosSetUp";
export const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await iaxios.get("http://localhost:4800/userdataclient"); // Assuming this route exists on your backend server
        setUserData(response.data); // Assuming the token is returned in the response data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);
  console.log(userData);
  return (
    <UserContext.Provider value={{ userData }}>
      {children}
    </UserContext.Provider>
  );
};
